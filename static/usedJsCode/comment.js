    $(document).ready(function() {
        const commentstore= document.querySelector("#commentstore")
        $("#comment-submit").on("click", function() {
            let commentText = $("#commentmessage").val();
            let postSlug =  $("#comment-id").data("content"); // Replace this with your actual post slug
            let formData = new FormData();
            formData.append("csrfmiddlewaretoken", "{{ csrf_token }}");
            formData.append("comments", commentText);
            if($("#comment_pics")[0]){
                formData.append("comment_pics", $("#comment_pics")[0].files[0]); // Assuming you have an input with id "comment_pics"
            }
            $.ajax({
                method: "POST",
                url: "/comment/save/" + postSlug + "/",
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    window.location.reload()
                    Toastify({
                        text: "comment posted",
                        duration: 3000,
                        newWindow: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                        },
                        // onClick: function(){} // Callback after click
                        }).showToast();
                       
                    // Handle the response here
                    // window.location.reload()
                },
                error: function(error) {
                    
                    Toastify({
                        text: "Something went wrong, try again later",
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                        },
                        // onClick: function(){} // Callback after click
                    }).showToast();
                          
                    // Handle the error here
                }
            });
        });


        $("#commentstore").on("click", ".postreplies", function (e) {
            const clickedElement = $(this);
            const dataContent = clickedElement.attr("data-content");  

            // Find the corresponding reply form
            const replyForm = $(".replyform[data-content='" + dataContent + "']");
            if (replyForm.length > 0) {
                // Toggle the display property of the reply form
                replyForm.toggle();
            }
            
            $("#reply-submit").on("click", function() {
                let replyText = $("#replymessage").val();
                let postSlug =  replyForm.data('content'); // Replace this with your actual post slug
                let formData = new FormData();
                formData.append("csrfmiddlewaretoken", "{{ csrf_token }}");
                formData.append("reply_text", replyText);
                if($("#reply_pics")[0]){
                    formData.append("reply_pics", $("#reply_pics")[0].files[0]); // Assuming you have an input with id "comment_pics"
                }
                $.ajax({
                    method: "POST",
                    url: "/reply/save/" + postSlug + "/",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        // Handle the response here
                        replyText=""
                        window.location.reload()
                    },
                    error: function(error) {
                        
                        // Handle the error here
                    }
                });
            });

            
        });

        $("#more-replies").on("click", function() {
            let commentstore= $("#commentstore")
            let comment_id= $("#more-replies").data('content')
            
            commentstore.empty()
            $.ajax({
                method: "GET",
                url: "/reply/" + comment_id + "/",
                dataType: "json",
                success: function(response) {
                    
                    
                    response.replies.forEach(function (reply) {
                    // Handle the response here
                        let replyiamgeandauthor=$("div")
                        let image;
                        // Apply styles using jQuery CSS manipulation
                        let gridParent=$('<div>').addClass('pl-4');
                        let gridChild= $('<div>').addClass('w-fit flex text-center mt-7');
                        let img=$('<img>').addClass('rounded-full').css({
                            width: '35px',
                            height: '35px'
                        });
                        img.attr("src", reply.prof_pics)
                        let username=$('<p>').addClass('text-green-300 ml-2');
                        // 
                        
                        username.text(reply.reply_author)
                        gridChild.append(img, username)
                        gridParent.append(gridChild)
                        let outerDiv = $('<div>').addClass('h-fit w-fit bg-base-lightbg dark:bg-base-darkbgvariant shadow-lg hover:shadow-xl rounded-xl ').css({
                        'margin-left': '3.6rem'
                    });

                        let innerDiv = $('<div>').addClass('text-white px-4 py-4').text(reply.reply);

                        // Append the innerDiv to the outerDiv
                        outerDiv.append(innerDiv);
                        if(reply.reply_pics){
                            image = $('<img>').attr('src', '{{reply.reply_pics.url}}').attr('alt', '').addClass('w-[155px] h-[175px] md:h-[270px] md:w-[240px] lg:w-full lg:h-[375px] rounded-lg');
                        }

                        // Create the container div for post replies
                        let repliesContainer = $('<div>').addClass('postrepliesparent px-8 flex gap-4 items-center').css({
                            'padding-top': '4px',
                            'margin-left': '1.8rem'
                        });
                        let heartIcon = $('<i>').addClass('fa fa-heart').attr('aria-hidden', 'true').css({
                            'color': 'white',
                            'cursor': 'pointer'
                        });

                        // Create the post replies div
                        let postRepliesDiv = $('<div>').addClass('postreplies').attr('data-content', '{{i.id}}');
                        let commentsIcon = $('<i>').addClass('fa fa-comments').attr('aria-hidden', 'true').css({
                            'color': 'white',
                            'cursor': 'pointer'
                        });
                        postRepliesDiv.append(commentsIcon);

                        // Append the heart icon and post replies div to the replies container
                        repliesContainer.append(heartIcon, postRepliesDiv);
                        commentstore.append(gridParent, outerDiv, repliesContainer)
                    })
                },
                error: function(error) {
                    
                    // Handle the error here
                }
            
        })
        });

    });

