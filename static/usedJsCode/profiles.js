
let envURL ='https://django-channels-byf5.onrender.com'
let trash = document.querySelectorAll('.profiletrash'); 
trash.forEach((trashbutton)=>{
    trashbutton.addEventListener('click', async (e) => {        
        const postId = (trashbutton.children[0].getAttribute('data-postdeleteid'));
        const eventPostId = e.target.parentElement.getAttribute('data-postdeleteid');
                if(postId === eventPostId){
            const response = await fetch(`${envURL}/delete_user_post/${postId}/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken2,
                },
            });

                const data = await response.json()
                if (response.ok && data.success === "true") {
                    const len_posts = document.querySelector('#len_posts')
                    len_posts.innerHTML= (+len_posts.innerHTML)-1
                    if(trashbutton.parentElement.parentElement.parentElement.childElementCount<2){
                        let ptext = document.createElement('p')
                        ptext.innerHTML = 'No feeds to fetch'
                        ptext.classList.add('h-screen', 'w-full', 'bg-base-lightbg', 'dark:bg-base-darkbg', 'text-[#0d2438]', 'dark:text-white', 'text-center');
                        const noFeeds = document.querySelector('#postcontent')
                        noFeeds.append(ptext)
                    }
                trashbutton.parentElement.parentElement.style.display = "none"            
                Toastify({
                    text: "Delete succesfull ",
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
            } else {
                Toastify({
                    text: "An error ocured, please try again later ",
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
                // Handle error, maybe show an error message
            }
    }})
})



  
let profileunfriendmodal= document.querySelector("#profileunfriendmodal")
let profileclosemodal= document.querySelector("#profileclosemodal")
let profileconfirmunfriend= document.querySelector("#profileconfirmunfriend")
let unfriendButton= document.querySelector("#unfriendButton")
let dataparent = document.querySelector('.dataparent');
// let profile_message_input = document.querySelector('#profile_message_input');
let friendName= undefined
// let profile_message = document.querySelector('#profile_message');
// let messageInputDom = document.querySelector('#profilemessage');

const profilePictureInput = document.getElementById('profilePictureInput');
const cameraIconLabel = document.getElementById('cameraIconLabel');
const cameraIcon = document.getElementById('cameraIcon');
const imagePreview = document.getElementById('imagePreview');
const previewImage = document.getElementById('previewImage');
const profilesubmitButton = document.getElementById('submitButton');
const profileCancelButton = document.getElementById('cancelButton');

// Listen for changes in the file input
if(profilePictureInput){
    profilePictureInput.addEventListener('change', function () {
        const selectedFile = profilePictureInput.files[0];  

        // Display the selected image in the preview
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                imagePreview.style.display = 'block';
                profilesubmitButton.style.display = 'block';
                profileCancelButton.style.display = 'block';
            };
            reader.readAsDataURL(selectedFile);
        }
        
        if (profilesubmitButton) {                   
            profilesubmitButton.onclick = async (e)=> {
                const formData = new FormData(document.querySelector('#postform'));
                formData.append('prof_pics', selectedFile)
                const response = await fetch(`${envURL}/change_profile_picture`, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': '{{ csrf_token }}',
                },
            });
                if(response.ok){
                    window.location.reload()
                    Toastify({
                        text: "Successful",
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
                }else{
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
                }   
                        }
        }
        if (profileCancelButton) {                   
            profileCancelButton.onclick = function (e) {
                profilePictureInput.value = "";
                imagePreview.style.display = 'none';
                profilesubmitButton.style.display = 'none';
                profileCancelButton.style.display = 'none';
            };
            // reader.readAsDataURL(selectedFile);
        }
    });          
}


if(unfriendButton){
unfriendButton.addEventListener("click", (e)=>{profileunfriendmodal.style.display="block"; 
friendName=e.target.getAttribute('data-content')
})
}
profileclosemodal.addEventListener("click", ()=>profileunfriendmodal.style.display="none")
profileconfirmunfriend.addEventListener("click", (e)=>{
const csrfUnfriendToken = getCookie("csrftoken");
let xhr = new XMLHttpRequest();
xhr.open('POST',  `${envURL}/removefriends/${friendName}/`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrfToken); 
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { 
            profileunfriendmodal.style.display="none"
    }
}
xhr.send()
})



function showContent(contentType) {
    let contentElements = document.getElementsByClassName('content');
    let buttons = document.querySelectorAll('.active');
    let posts = document.querySelector('#postcontent');              
    
    for (let i = 0; i < contentElements.length; i++) {
        let content = contentElements[i];
        let dataContent = content.getAttribute('data-content');
        
        if (dataContent === contentType) {
            if(dataContent==="findfriends" || dataContent==="friendrequest" ||dataContent==="groups"||dataContent==="about" ||dataContent==="friends"){
                content.style.width = "100%"; // -w-full equivalent
                content.style.height = "100%"; // -h-full equivalent
                content.style.display = "grid";
                content.style.justifyContent = "center";
                posts.style.display = 'none';
            }else if(dataContent==="post"){
                content.style.display = 'block';
                posts.style.display = 'flex'
                posts.style.flexDirection = 'column'
            }
        }else {
        content.style.display = 'none';
        }
    }


    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];  
        let dataContent = button.getAttribute('data-content');
        if (dataContent === contentType && dataContent!=="search") {
            if(dataContent !== "search"){
                button.style.paddingBottom="10px";
                button.style.borderBottom="4px solid #0d2438";
            }
        } else {
            if(dataContent !== "search"){
            button.style.borderBottom="0 solid transparent";
            }
        }
        
    }
    }




let profile_message2 = document.querySelector('#profile_message');

$(document).ready(function () {
    $("#friendrequestcontainer").click(function () {
        const colorMode = localStorage.getItem('mode');
        
        let friendBg;
        
        $(".friendrequestparent").empty()
       
        $.ajax({
        url: `${envURL}/received_request`,
        type: "GET",
        dataType: "json",
        success: function (response) {
                        if(response.received_request.length<1){
                let nofriend = $("<p>").text("No friend request yet");
                // let containernofriend = $("<div>");
                // containernofriend.css({"width": "100%", "text-align":"center"});

                $(".friendrequestparent").hide()
                $("#loadingsequence").hide()
                nofriend.appendTo(".friendrequestparent2")
            }else{
                $(".friendrequestparent2").hide()
                $("#loadingsequence").hide()
                $(".friendrequestparent").show()
                response.received_request.forEach(function (friend) {
                    let friendDivBg;
                    let friendDiv = $("<div>");
                    friendDiv.attr('id', "frienddivbg");
                    let container = $("<div>");
                    let imageAndOthersContainer = $("<div>");
                    let savedMode = localStorage.getItem('mode');
                    // if (savedMode) {
                    //     if(savedMode==="light"){
                    //         friendDivBg= false;
                    //     }else{
                    //         friendDivBg= true
                    //     }
                    // }
                    // Apply the Tailwind CSS classes to the friendDiv
                    friendDiv.css({
                    "width": "fit-content",
                    "height": "fit-content",
                    "padding": "1rem",
                    "display":"grid",
                    "gap":"5px",
                    "justify-item":"center",
                    "align-content":"center",
                    "background-color":`${friendDivBg?"#1D2833":"white"} `,
                    "border-radius":"10px",
                    "box-shadow": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    "cursor":"pointer",
                    "transform-origin": "center",
                    "transition-property": "transform",
                    "transition-duration": "300ms"
                    });

                    // Apply additional hover styles
                    friendDiv.hover(function () {
                    $(this).css({
                        "box-shadow": "var(--box-shadow-xl)",
                        "transform": "scale(1.05)"
                    });
                    }, function () {
                    $(this).css({
                        "box-shadow": "var(--box-shadow-lg)",
                        "transform": "scale(1)"
                    });
                    });

                    // Create a new <p> element to display the username
                    let usernameP = $("<p>").text(friend.name);
                    usernameP.css({"font-size":"bold"})
                    let acceptRequest = $("<p>").text("Accept request");
                    acceptRequest.css({
                        "width":"fit",
                        "height":"fit",
                        "padding":"6",
                        "border-radius":"5px",
                        "background-color":"rgb(22 163 74)",
                        "color":"rgb(209 213 219)",
                        "cursor":"pointer"                        
                    })
                    
                    let declineRequest = $("<p>").text("Decline request");
                    declineRequest.css({
                        "width":"fit",
                        "height":"fit",
                        "padding":"6",
                        "border-radius":"5px",
                        "background-color":"rgb(22 163 74)",
                        "color":"rgb(209 213 219)",
                        "cursor":"pointer"                        
                    })
                                        
                    let bio = $("<p>").text(friend.bio);

                    // Create a new <img> element to display the image
                    let image = $("<img>");
                    image.attr("src", friend.pics);
                    image.attr("alt", "Profile Picture");
                    image.attr("width", "80"); // Set the desired width
                    image.attr("height", "80");
                    image.css("border-radius", "50%")
                    let requestContainer = $("<div>");
                    
                    // Append the elements to the friendDiv
                    container.css({"display": "grid", "gap":"5px", "align-content":"center"})
                    imageAndOthersContainer.css({"display": "flex", "gap":"5px", "align-item":"center", })
                    requestContainer.css({"display": "flex", "gap":"5px","padding-right":"1rem", "padding-top":"1rem"})
                    container.append(usernameP);
                    container.append(bio);
                    requestContainer.append(acceptRequest);
                    requestContainer.append(declineRequest);
                    imageAndOthersContainer.append(image);
                    imageAndOthersContainer.append(container);
                    friendDiv.append(imageAndOthersContainer);
                    friendDiv.append(requestContainer);

                                        // Append the friendDiv to the dataContainer
                    acceptRequest.click(function () {
                        const csrftoken = getCookie('csrftoken');
                        $.ajax({
                                url: `${envURL}/acceptfriendrequests/${friend.relId}/`,
                                type: "POST",
                                dataType: "json",
                                beforeSend: function(xhr, settings) {
                                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                                },
                                success: function (response) {
                                    if(response.success=="ok"){
                                        requestContainer.empty()
                                        requestContainer.text("Accepted")
                                        requestContainer.css("text-align", "center")
                                    }
                                                                    }
                            })
                        
                    })
                    declineRequest.click(function () {
                        const csrftoken = getCookie('csrftoken');
                        $.ajax({
                                url: `${envURL}/declinefriendrequest/${friend.sender}/`,
                                type: "POST",
                                dataType: "json",
                                beforeSend: function(xhr, settings) {
                                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                                },
                                success: function (response) {
                                    if(response.success==="ok"){
                                        requestContainer.empty()
                                        requestContainer.text("Request declined")
                                        Toastify({
                                                text: "Request declined",
                                                duration: 3000,
                                                newWindow: true,
                                                gravity: "top", // `top` or `bottom`
                                                position: "right", // `left`, `center` or `right`
                                                stopOnFocus: true, // Prevents dismissing of toast on hover
                                                style: {
                                                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                                                },
                                        }).showToast();
                                        // window.location.reload()
                                }else{
                                    Toastify({
                                            text: "Error! please try again later",
                                            duration: 3000,
                                            newWindow: true,
                                            close: true,
                                            gravity: "top", // `top` or `bottom`
                                            position: "right", // `left`, `center` or `right`
                                            stopOnFocus: true, // Prevents dismissing of toast on hover
                                            style: {
                                                background: "linear-gradient(to right, #00b09b, #96c93d)",
                                            },
                                    }).showToast();
                                    }
                                                                    }
                            })
                        
                    })
                    
                    friendDiv.appendTo(".friendrequestparent");

            });
                
        }
    },
        error: function (error) {
                    }
    });
    

    });

    $("#searchButton").click(function () {
        let query= $("#searchButton").val()
        $.ajax({
            url: `${envURL}/search`,
            type: "GET",
            data:{"query":query},
            dataType: "json",
            success: function (response) {
                            },
            error: function(){
                            }
        })
    })
    
});

if(profile_message2){
    $("profileaddfriend").click(function () {
        let friendusername= profile_message2.getAttribute("receiver")

        $.ajax({
            url: `${envURL}/addfriends/${friendusername}/`,
            type: "POST",
            dataType: "json",
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            success: function (response) {
                if(response.success=="ok"){
                    $("profileaddfriend").text = "Added"
                }
            }
        })
    })


    $("profileblock").click(function () {
        $.ajax({
            url: `${envURL}/blockuser/${friendusername}/`,
            type: "POST",
            dataType: "json",
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            success: function (response) {
                if(response.success=="ok"){
                    $("profileblock").text = "Blocked"
                }
            }
        })
    })
    
}




// Get the elements
const groupsElement = document.querySelector('#groups');
const dropdownContent = document.querySelector('#dropdown-content');
const createContent = document.querySelector('#create-content');
// const groupsubmit = document.querySelector('#groupsubmit');
const groupcancelprofile = document.querySelector('#groupcancelprofile');


function getCookie(name) {
let cookieValue = null;
if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
    }
}
return cookieValue;
}

if(createContent){
createContent.onclick= function(){
    creategroupmodal.style.display="block"
}

}
if(groupcancelprofile){
groupcancelprofile.onclick= function(e){
    e.preventDefault()
    creategroupmodal.style.display="none"
}
}

$("#allgroups").on("click", function(){
$(".groupsparent").empty()
$.ajax({
    method: "GET",
    url: `${envURL}/allgroups`,
    processData: false,
    contentType: false,
    success: function(response) {
        // Handle the response here
        // window.location.reload()
        if(response.length <1){
            let ptext = $("<p>").text("No groups found");
            // Add classes to ptext using jQuery
            ptext.addClass('h-screen w-full bg-base-lightbg dark:bg-base-darkbg text-[#0d2438] dark:text-white text-center');
            // Append ptext to #postcontent using jQuery
            $('.groupsparent').append(ptext);
        }else{
            JSON.parse(response).forEach((details)=>{
                let friendDiv = $("<div>");
                let container = $("<div>");
                let nameHolder = $("<div>");
                nameHolder.css({"display": "grid", "gap":"5px", "justify-items":"center"})
                container.css({ "display": "flex", "gap":"5px", "justify-content":"center"})
                // Apply the Tailwind CSS classes to the friendDiv
                friendDiv.css({
                "width": "fit-content",
                "height": "fit-content",
                "padding-top": "1rem",
                "padding-bottom": "1rem",
                "padding-left": "1rem",
                "padding-right": "1rem",
                "display":"grid",
                "gap":"5px",
                "justify-items":"center",
                "align-content":"center",
                "box-shadow": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                "border-radius": "10px",
                "margin-top": "1rem",
                "margin-bottom": "1rem",
                "margin-left": "1rem",
                "margin-right": "1rem",
                "cursor":"pointer",
                "transform-origin": "center",
                "transition-property": "transform",
                "transition-duration": "300ms"
                });
    
                // Apply additional hover styles
                friendDiv.hover(function () {
                    $(this).css({
                        "box-shadow": "var(--box-shadow-xl)",
                        "transform": "scale(1.05)"
                    });
                }, 
                function () {
                    $(this).css({
                        "box-shadow": "var(--box-shadow-lg)",
                        "transform": "scale(1)"
                    });
                });
    
                // Create a new <p> element to display the username
                let name = $("<p>").text(details.fields.name);
                let about = $("<p>").text(details.fields.description);
                let user = $("#prof_pics").data('content')
                name.css({"font-size":"bold"})
                about.css({ "opacity":"0.6", "margin-bottom":"1rem"})
                let image = $("<img>");
                image.attr("src", details.fields.cover_photo);
                image.attr("alt", "cover photo");
                image.attr("width", "80"); // Set the desired width
                image.attr("height", "80");
                image.css("border-radius", "50%")
                                                    let joinGroup;
                if(user===details.fields.owner){
                    joinGroup= $("<p>").text("Your group")
                    joinGroup.css("color","lime")
                }else{
                    joinGroup= $("<p>").text("join group")
                    joinGroup.css({
                        "width":"80%",
                        "height":"fit",
                        "padding":"6",
                        "border-radius":"5px",
                        "background-color":"rgb(22 163 74)",
                        "color":"rgb(209 213 219)",
                        "cursor":"pointer",
                        "text-align":"center"                        
                    })
                    joinGroup.click(function () {
                        const csrftoken = getCookie('csrftoken');
                        $.ajax({
                            url: `${envURL}/join-group/${details.pk}`,
                            type: "POST",
                            dataType: "json",
                            beforeSend: function(xhr, settings) {
                                xhr.setRequestHeader("X-CSRFToken", csrftoken);
                            },
                            success: function (response) {
                                                        }
                        })
                    })
                
                }
                nameHolder.append(name);
                nameHolder.append(about);
                container.append(image);
                container.append(nameHolder);
                friendDiv.append(container)
                friendDiv.append(joinGroup)
                friendDiv.appendTo(".groupsparent");
    
                friendDiv.click(function () {
                    window.location.href=`${envURL}/group-view/${details.fields.name}`
                })
            })
        }
    },
    error: function(error) {
        console.log(error);
                // Handle the error here
    }
});
})

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
                        // Handle the error here
        }
    });
};


function postReply(e, replyUrl) {
    const clickedElement = $(this);
    const dataContent = clickedElement.attr("data-content");
        
    // Find the corresponding reply form
    const replyForm = $(".replyform[data-content='" + dataContent + "']");
    if (replyForm.length > 0) {
        // Toggle the display property of the reply form
        replyForm.toggle();
    }
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
                                // Handle the error here
            }
        });
    });

    
};




