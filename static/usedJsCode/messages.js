function showContent(contentType) {
    let contentElements = document.getElementsByClassName('content');
    let buttons = document.querySelectorAll('.active');
    
    let dataparent = document.querySelector('.dataparent');

    

    
    for (let i = 0; i < contentElements.length; i++) {
        let content = contentElements[i];
        let dataContent = content.getAttribute('data-content');
        if (dataContent === contentType) {
                content.style.display = 'block';
            }
        else {
        content.style.display = 'none';
        }
    }


    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];  
        let dataContent = button.getAttribute('data-content');
        if (dataContent === contentType) {
            button.style.borderBottom="4px solid #0d2438";
        } else {
            button.style.borderBottom="0 solid transparent";
        }
    }
    }

    if(window.location.pathname==="/messages/"){
        localStorage.removeItem("count")
    }
