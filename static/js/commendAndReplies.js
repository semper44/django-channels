    function postComment(url) {
        let commentText = $("#commentmessage").val();
        let formData = new FormData();
        formData.append("csrfmiddlewaretoken", "{{ csrf_token }}");
        formData.append("comments", commentText);
        if($("#comment_pics")[0]){
            formData.append("comment_pics", $("#comment_pics")[0].files[0]); // Assuming you have an input with id "comment_pics"
        }
        $.ajax({
            method: "POST",
            url: url,
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // Handle the response here
                // window.location.reload()
            },
            error: function(error) {
                console.log(error);
                // Handle the error here
            }
        });
    };


    function postReply(e, replyUrl) {
        const clickedElement = $(this);
        const dataContent = clickedElement.attr("data-content");
        console.log("Clicked Element:", clickedElement);
        console.log("data-content:", dataContent);

        // Find the corresponding reply form
        const replyForm = $(".replyform[data-content='" + dataContent + "']");
        if (replyForm.length > 0) {
            // Toggle the display property of the reply form
            replyForm.toggle();
        }
        console.log(replyForm.data('content'));
        $("#replyinput").on("click", function() {
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
                url: replyUrl,
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    // Handle the response here
                    // window.location.reload()
                },
                error: function(error) {
                    console.log(error);
                    // Handle the error here
                }
            });
        });

        
    };


