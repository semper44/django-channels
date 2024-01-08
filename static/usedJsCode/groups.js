    // let groupcreate = document.querySelector('#groupcreate');            
    // let groupmodal = document.querySelector('#groupmodalpost'); 
    // let groupsubmit = document.querySelector('#grouppostsubmit'); 
    // let groupclose = document.querySelector('#groupclose'); 
    let groupEnvURL =" {{URL_KEY}}"
    let groupSearch = document.querySelector('#groupsearchButton'); 
    let approvepost = document.querySelectorAll('.approvepost'); 
    let trash = document.querySelectorAll('.trash'); 
    let declinepost = document.querySelectorAll('.declinepost'); 
    let groupname = document.querySelector('#group-name').getAttribute('data-content'); 

    // const groupPostparentmodalpreview = document.getElementById('groupPostparentmodalpreview');
    const groupcoverpictureInput = document.getElementById('groupcoverpictureInput');
    const groupcameraIconLabel = document.getElementById('groupcameraIconLabel');
    const groupcameraIcon = document.getElementById('groupcameraIcon');
    const groupimagePreview = document.getElementById('groupimagePreview');
    const groupPreviewImage = document.getElementById('groupPreviewImage');
    const groupsubmitButton = document.getElementById('groupsubmitButton');
    const groupcancelButton = document.getElementById('groupcancelButton');

    // Listen for changes in the file input
    if(groupcoverpictureInput){
        groupcoverpictureInput.addEventListener('change', function () {
            const selectedFile = groupcoverpictureInput.files[0];  

            // Display the selected image in the preview
            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    groupPreviewImage.src = e.target.result;
                    groupimagePreview.style.display = 'block';
                    groupsubmitButton.style.display = 'block';
                    groupcancelButton.style.display = 'block';
                };
                reader.readAsDataURL(selectedFile);
            }
            
            if (groupsubmitButton) {                   
                groupsubmitButton.onclick = async (e)=> {
                    
                    const formData = new FormData();
                    formData.append('cover_photo', selectedFile)
                    
                    const response = await fetch(`${groupEnvURL}/change_group_cover_picture/${groupname}/`, {
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
            if (groupcancelButton) {                   
                groupcancelButton.onclick = function (e) {
                    groupcoverpictureInput.value = "";
                    groupimagePreview.style.display = 'none';
                    groupsubmitButton.style.display = 'none';
                    groupcancelButton.style.display = 'none';
                };
                // reader.readAsDataURL(selectedFile);
            }
        });          
    }
    
    function showContent(contentType) {
        let contentElements = document.getElementsByClassName('content');
        let buttons = document.querySelectorAll('.active');
        let posts = document.querySelector('#postcontent');
        let postbutton = document.querySelector('#postbutton');        
        for (let i = 0; i < contentElements.length; i++) {
            let content = contentElements[i];
            let dataContent = content.getAttribute('data-content');

            if (dataContent === contentType) {
                if(dataContent==="members" || dataContent==="posts" || dataContent==="search" || dataContent==="drafts"){
                    content.style.width = "90%"; // -w-full equivalent
                    content.style.height = "100%"; // -h-full equivalent
                    content.style.display = "flex";
                    content.style.flexDirection = "column";
                    content.style.justifyContent = "center";
                    if(dataContent !== "drafts"){
                        content.style.margin = "1rem";

                    }
                }
                
            }else {
            content.style.display = 'none';
            }
        }

        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];  
            let dataContent = button.getAttribute('data-content');
            if (dataContent === contentType && dataContent!=="search" ) {
                if(dataContent !== "search" ){
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
    // to give the postbutton underline on load
    postbutton.style.paddingBottom="10px";
    postbutton.style.borderBottom="4px solid #0d2438"

    
    approvepost.forEach((button)=>{
        button.addEventListener('click', async (e) => {
        const postId = button.getAttribute('data-postid');
        const groupId = button.getAttribute('data-groupid');

        const formData = new FormData(document.querySelector('#groupcreatepostform'));
        const response = await fetch(`${groupEnvURL}/approve_post/${groupId}/${postId}/`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': '{{ csrf_token }}',
            },
        });

        if (response.ok) {
            button.style.display="none"
            button.nextElementSibling.style.display="none"
            let ap= document.createElement("h1")
            ap.innerHTML="Approved"
            ap.style.color="#16a34a"
            let v= button.parentElement
            button.parentElement.append(ap)
            Toastify({
                text: "Post approved successfully ",
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
                text: "Post unappproved, please try again later ",
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
    });
})

    trash.forEach((trashbutton)=>{
        trashbutton.addEventListener('click', async (e) => {
        const postId = trashbutton.querySelector(".trashchild").getAttribute('data-postid');
        const groupId = trashbutton.querySelector(".trashchild").getAttribute('data-groupid');
        
        const formData = new FormData(document.querySelector('#groupcreatepostform'));
        const response = await fetch(`${groupEnvURL}/delete_group_post/${groupId}/${postId}/`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': '{{ csrf_token }}',
            },
        });
        
        
        const data = await response.json()
        if (response.ok===true && data.success === "true") {
            trashbutton.parentElement.previousElementSibling.style.display="none"
            trashbutton.parentElement.style.display="none"
            Toastify({
                text: "Post deleted ",
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
                text: "Error, please try again later ",
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
    });
    })

    declinepost.forEach((declinepostbutton)=>{
        declinepostbutton.addEventListener('click', async (e) => {
        const postId = declinepostbutton.getAttribute('data-postid');
        const groupId = declinepostbutton.getAttribute('data-groupid');
        

        const formData = new FormData(document.querySelector('#groupcreatepostform'));
        const response = await fetch(`${groupEnvURL}/delete_group_post/${groupId}/${postId}/`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': '{{ csrf_token }}',
            },
        });
        
        
        if (response.ok===true) {
            declinepostbutton.style.display="none"
            declinepostbutton.previousElementSibling.style.display="none"
            let ap= document.createElement("h1")
            ap.innerHTML="Declined"
            ap.style.color="#16a34a"
            let v= declinepostbutton.parentElement
            declinepostbutton.parentElement.append(ap)
            Toastify({
                text: "Post declined ",
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
        } else {
            Toastify({
                text: "Error, please try again later ",
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
    });
    })

    
    // groupSearch.addEventListener('click', async (e) => {
    //     e.preventDefault();
    //     const response = await fetch(`${groupEnvURL}/group_search/${groupname}/`, {
    //         method: 'GET',
    //         data:{"query":query},
    //     });

    //     if (response.ok) {
    //         // Handle success, maybe close the modal and show a success message
    //         // window.location.reload()
    //         // Reload or update the posts on the page as needed
    //     } else {
    //         // Handle error, maybe show an error message
    //     }
    // });

