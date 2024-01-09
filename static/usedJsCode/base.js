const topsearchButton = document.querySelector('#topsearchButton');
const modal = document.querySelector('#modal');   
const submitButton = document.querySelector('#submit');
const groupcancel = document.querySelector('#groupcancel');
const creategroupmodalbase = document.querySelector('#creategroupmodal');
const grouppagecreategroup = document.querySelector('#grouppagecreategroup');
const topsearchmodal = document.querySelector('#searchmodal');
const searchmodalparent = document.querySelector('#searchmodalparent');
const searchmodalcancel = document.querySelector('#searchmodalcancel');
let baseresponseUrlKey


let baseTypingTimer;
// const delaybase = 85000
topsearchButton.addEventListener("input",  (e) => {
clearTimeout(baseTypingTimer)
typingTimer= setTimeout( async () => {
    e.preventDefault();
    searchmodalparent.style.display="block"
    const formData = new FormData(document.querySelector('#topsearchButtonform'));
    const searchParams = new URLSearchParams(formData);
    const url = '{% url "search" %}' + '?' + searchParams.toString();

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-CSRFToken': '{{ csrf_token }}',
        },
    });
    // document.querySelector("#rightnavcancel").style.display="block"
    // );
        const data = await response.json(); // Parse the JSON response
        topsearchmodal.innerHTML=""
        if(data.results.length>=1){ 
                data.results.slice(0, 3).forEach(item => {
                let parentdiv= document.createElement("div")
                let buttonparentdiv= document.createElement("div")
                let namesparentdiv= document.createElement("div")
                let imageparentdiv= document.createElement("div")
                let profPics= document.createElement("img")
                let username= document.createElement("p")
                let bio= document.createElement("p")
                let viewProfile= document.createElement("p")
                let addfriend= document.createElement("p")
                parentdiv.style.width="80%"
                parentdiv.style.padding="1.5rem 0"
                parentdiv.style.height="fit-content"
                parentdiv.style.position="relative"
                parentdiv.style.borderRadius="10px"
                parentdiv.style.minHeight="108px"

                profPics.style.width="60px"
                profPics.style.height="60px"
                profPics.style.borderRadius="50%"
                profPics.style.position="absolute"
                profPics.style.left="4%"
                profPics.style.zIndex="20"


                // profPics.style.paddingLeft="7%"
                username.style.color="limegreen"
                username.style.width="100%"
                username.style.textAlign="center"


                
                bio.style.color="white"
                bio.style.width="100%"
                bio.style.textAlign="center"        

                viewProfile.style.height="fit-content"
                viewProfile.style.width="fit-content"
                viewProfile.style.padding="5px"
                viewProfile.style.color="white"
                viewProfile.style.borderRadius="5px"
                viewProfile.style.backgroundColor="limegreen"
                viewProfile.style.zIndex="20"
                viewProfile.style.marginTop="8px"
                viewProfile.style.cursor="pointer"
                viewProfile.innerHTML="View"

                
                namesparentdiv.style.display="grid"
                namesparentdiv.style.backgroundColor="black"
                namesparentdiv.style.opacity="0.4"
                namesparentdiv.style.backdropFilter="blur(2px)"
                namesparentdiv.style.position="absolute"
                namesparentdiv.style.bottom="0"
                namesparentdiv.style.width="100%"
                namesparentdiv.style.height="50%"
                namesparentdiv.style.borderRadius="5px"
                namesparentdiv.style.paddingBottom="3x"
                parentdiv.style.background= "white"

                if(item.prof_pics && item.username){
                    bio.innerHTML=item.bio
                    username.innerHTML=item.username
                    profPics.src= item.prof_pics
                    parentdiv.append(profPics)
                    viewProfile.onclick=function(){
                        window.location.href=`${data.URL_KEY}/profile/${item.username}/ `
                    }
                    
                }else if(item.prof_pics && item.owner){
                    username.innerHTML=item.content
                    viewProfile.onclick=function(){
                        window.location.href=`${data.URL_KEY}/comments/${item.slug}/ `
                    }                                   
                }
                else{
                    profPics.src= item.pics
                    username.innerHTML=item.name
                    bio.innerHTML= item.description
                    profPics.src= item.photo
                    parentdiv.append(profPics)
                    viewProfile.onclick=function(){
                        window.location.href=`${data.URL_KEY}/group-view/${item.name}/ `
                        ;
                        ;
                    } 
                    
                }
                namesparentdiv.append(username)
                namesparentdiv.append(bio)

                buttonparentdiv.append(viewProfile)
                buttonparentdiv.style.position="absolute"
                buttonparentdiv.style.right="4%"
                buttonparentdiv.style.top="6%"
                buttonparentdiv.style.zIndex="10"
                
                // buttonparentdiv.append(imageparentdiv)
                parentdiv.append(buttonparentdiv)
                parentdiv.append(namesparentdiv)
                topsearchmodal.append(parentdiv)
            });  
            let seeAll= document.createElement("p")
            seeAll.innerHTML="See all"
            seeAll.style.marginTop = '1rem';
            seeAll.style.width = '75%';
            seeAll.style.backgroundColor = 'white'; // Set background color
            seeAll.style.color = '#0d2438';
            seeAll.style.textAlign = 'center';
            seeAll.style.cursor = 'pointer';
            seeAll.style.border = '1px solid #00cc66';
            seeAll.style.padding = '0.5rem 0';
            seeAll.style.borderRadius = '10px';
            seeAll.style.color = '#0d2438';
            

            topsearchmodal.append(seeAll)
            seeAll.addEventListener('mouseenter', function () {
                seeAll.style.backgroundColor = '#16a34a'; // Change background color on hover
                seeAll.style.color = 'white';
            });

            seeAll.addEventListener('mouseleave', function () {
                seeAll.style.backgroundColor = 'white'; // Reset background color on mouse leave
                seeAll.style.color = '#0d2438';
            });
            seeAll.addEventListener("click",  async(e) => {
                const url = '{% url "search" %}' + '?' + searchParams.toString();
                window.location.href='{% url "search_view_template" %}' + '?' + searchParams.toString();
            })                         
        }else{
            topsearchmodal.innerHTML= "Search not found"
        }
    
})                                                       

})

searchmodalcancel.addEventListener("click",  (e) => {
topsearchmodal.innerHTML=""
searchmodalparent.style.display="none"

})




function mobilecreatepost(){
modal.style.display='block'
document.querySelector('#id_content').focus();

}

function mobilecreatgroup(){
creategroupmodalbase.style.display='block'
}
function mobilecreatestatus(){
statusmodal.style.display='block'
document.querySelector('#id_content').focus();

}

groupcancel.addEventListener("click", ()=>{creategroupmodalbase.style.display='none'})
if(grouppagecreategroup){
grouppagecreategroup.addEventListener("click", ()=>{
    creategroupmodalbase.style.display='block'
})
}

//    bg change

const body = document.querySelector('body');
const btn = document.querySelector('#ball');
const btn2 = document.querySelector('#ball2');
const left = document.querySelector('#leftnav');
    
// Retrieve mode value from local storage if it exists
const savedMode = localStorage.getItem('mode');

if (savedMode !== null) {
body.classList.add(savedMode)
if(savedMode==="light"){
    btn.classList.add("balllight");
    btn2.classList.add("balllight");
}else{
    btn.classList.add("balldark");
    btn2.classList.add("balldark");

}
}else{
btn.classList.add("balllight");
btn2.classList.add("balllight");
}

const toggleDarkMode = () => {
body.classList.toggle('dark');
// Store the mode value in local storage
const mode = body.classList.contains('dark') ? 'dark' : 'light';
localStorage.setItem('mode', mode);
if(mode==="light"){
    btn.classList.remove("balldark");
    btn.classList.add("balllight");
    btn2.classList.remove("balldark");
    btn2.classList.add("balllight");
    let store1=document.querySelectorAll("#findfrienddivbg")
    for(let i of store1){
        i.style.backgroundColor="white"
    }

    let store2= document.querySelectorAll("#frienddivbg")
    for(let x of store2){
        x.style.backgroundColor="white"
    }

}else{
    btn.classList.remove("balllight");
    btn.classList.add("balldark");
    btn2.classList.remove("balllight");
    btn2.classList.add("balldark");
    let store1=document.querySelectorAll("#findfrienddivbg")
    for(let i of store1){
        i.style.backgroundColor="#1D2833"
    }

    let store2= document.querySelectorAll("#frienddivbg")
    for(let x of store2){
        x.style.backgroundColor="#1D2833"
    }



}

};
if(btn){
btn.addEventListener('click', toggleDarkMode);            
btn2.addEventListener('click', toggleDarkMode);            
}

//    chatting logic and notification
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const urls = `${protocol}//${window.location.host}/ws/home/`
let messages = document.querySelector('#online')
let onlinePeople = document.querySelector('#online-people')
const chatChat= document.querySelector("#chat-chat")
// const messageHolder= document.querySelector("#container")
const messageStore= document.querySelector("#messageStore")
const img= document.querySelector("#img")
const samePerson= document.querySelector("#baseuserid").innerHTML
const chats = document.querySelector('#chat');
const senddiv = document.querySelector('#sendiv');
const online = document.querySelector('#online');
const form = document.querySelector('form');
const realtimemessgcontainer=document.querySelector("#realtimemessgcontainer")
const realtimemessg=document.querySelector("#realtimemessg")
const onlinechat=document.querySelector("#onlinechat")
const backarrow= document.querySelector("#backarrow")          
const onlinechatbutton=document.querySelector("#onlinechatbutton")
const likeCount = document.querySelector("#likeholder");
const logout = document.querySelector("#logout");
const csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;
const onlineSocket = new WebSocket(urls)
const requestUser= document.querySelector("#baseuserid").getAttribute("data-id")


let addnotif
if(localStorage.getItem("notificationadd") != undefined){
addnotif=localStorage.getItem("notificationadd")
}else{
addnotif=0
}
let bellicon2= document.querySelector("#bellicon2")
const bell=document.querySelector("#bellicon")
let increase= bell.innerHTML

let dbnotif;
let logout_notification;
let message_logout_notification;
let messagenotifrightnav;
const savedCount = localStorage.getItem('count');
let messagenotif2= document.querySelector("#messagenotif2")
let count;
let notifTotal;
let profile_message = document.querySelector('#profile_message');




let suggestions= document.querySelector("#suggestions")
// rightnav findfriends
let xhrfriends = new XMLHttpRequest();
xhrfriends.open('GET',  `http://127.0.0.1:8000/findfriends/`, true);
xhrfriends.setRequestHeader('Content-Type', 'application/json');
xhrfriends.onreadystatechange = function () {
if (xhrfriends.readyState === XMLHttpRequest.DONE && xhrfriends.status === 200) {                          
        baseresponse= JSON.parse(xhrfriends.responseText)
        baseresponseUrlKey = baseresponse.URL_KEY
        baseresponse.find_friends.slice(0, 3).forEach(item => {
            if(item.username !== ""){
            let parentdiv= document.createElement("div")
            let buttonparentdiv= document.createElement("div")
            let namesparentdiv= document.createElement("div")
            let imageparentdiv= document.createElement("div")
            let profPics= document.createElement("img")
            let username= document.createElement("p")
            let bio= document.createElement("p")
            let viewProfile= document.createElement("p")
            let addfriend= document.createElement("p")
            parentdiv.style.width="80%"
            parentdiv.style.padding="1.5rem 0"
            parentdiv.style.height="fit-content"
            parentdiv.style.position="relative"
            parentdiv.style.backgroundColor="transparent"

            // parentdiv.style.backgroundImage= "url("+ item.cover +")"
            parentdiv.style.border="0.8px solid #635a5aab"
            parentdiv.style.borderRadius="10px"
            parentdiv.style.minHeight="108px"

            profPics.src= item.pics
            profPics.style.width="60px"
            profPics.style.height="60px"
            profPics.style.borderRadius="50%"
            profPics.style.position="absolute"
            profPics.style.left="4%"
            profPics.style.zIndex="20"


            parentdiv.append(profPics)
            // profPics.style.paddingLeft="7%"
            username.innerHTML=item.username
            username.style.color="white"
            username.style.width="100%"
            username.style.textAlign="center"


            bio.innerHTML="item.bio"
            bio.style.color="white"
            bio.style.width="100%"
            bio.style.textAlign="center"

            addfriend.innerHTML="Add"
            viewProfile.innerHTML="View"
            addfriend.style.height="fit-content"
            addfriend.style.width="fit-content"
            addfriend.style.padding="5px"
            addfriend.style.color="white"
            addfriend.style.backgroundColor="limegreen"
            addfriend.style.borderRadius="5px"
            addfriend.style.cursor="pointer"

            viewProfile.style.height="fit-content"
            viewProfile.style.width="fit-content"
            viewProfile.style.padding="5px"
            viewProfile.style.color="white"
            viewProfile.style.borderRadius="5px"
            viewProfile.style.backgroundColor="limegreen"
            viewProfile.style.zIndex="20"
            viewProfile.style.marginTop="8px"
            viewProfile.style.cursor="pointer"
            viewProfile.onclick=function(){
                window.location.href=`${baseresponseUrlKey}/profile/${item.username}/ `
            }

            addfriend.onclick=function(){
                window.location.href=`${baseresponseUrlKey}/addfriends/${item.username}/ `
            }

            
            namesparentdiv.style.display="grid"
            namesparentdiv.style.backgroundColor="black"
            namesparentdiv.style.opacity="0.4"
            namesparentdiv.style.backdropFilter="blur(2px)"
            namesparentdiv.style.position="absolute"
            namesparentdiv.style.bottom="0"
            namesparentdiv.style.width="100%"
            namesparentdiv.style.height="50%"
            namesparentdiv.style.borderRadius="5px"
            namesparentdiv.style.paddingBottom="3x"
            namesparentdiv.append(username)
            namesparentdiv.append(bio)

            buttonparentdiv.append(addfriend)
            buttonparentdiv.append(viewProfile)
            buttonparentdiv.style.position="absolute"
            buttonparentdiv.style.right="4%"
            buttonparentdiv.style.top="6%"
            buttonparentdiv.style.zIndex="10"
            
            // buttonparentdiv.append(imageparentdiv)
            parentdiv.append(buttonparentdiv)
            parentdiv.append(namesparentdiv)
            suggestions.append(parentdiv)
            }
            dbnotif = item.notif
            logout_notification= item.logout_notification
            message_logout_notification= item.logout_message_notification
            messagenotifrightnav = item.message_notif
            
        });
        

        
        if(savedCount !==null || savedCount !== undefined){
            count=savedCount
            if(+savedCount >0){
                messagenotif2.style.display="block" 
            }
        } 
        else{
            count=0
        }

        if( count>=1 || +(messagenotifrightnav) >=1 || +(message_logout_notification)>=1){
            let messagenotif= document.querySelector("#messagenotif")
            let messageTotalNotif= +(count) + (+messagenotifrightnav) + (+message_logout_notification)
            if(messagenotif !== null){
                messagenotif.innerHTML=messageTotalNotif
                messagenotif.style.color="white"
                messagenotif.style.display="flex"
                messagenotif.style.justifyContent="center"
                messagenotif.style.alignItems="center"
                localStorage.setItem("count", messageTotalNotif)
            }
            if(messagenotif2 !== null){
                messagenotif2.innerHTML=+(count) + +(messagenotifrightnav)
                messagenotif2.style.color="white"
                messagenotif2.style.display="flex"
                messagenotif2.style.justifyContent="center"
                messagenotif2.style.alignItems="center"
            }
        }

        if(bellicon2){
            bellicon2.style.display="none"
        } 
        if(bell){
            bell.style.display="none"
        }   
    
        if( addnotif !== null){
            notifTotal= +(addnotif) +  +(dbnotif)
            
            localStorage.setItem("notificationadd", notifTotal)
            if(bell){
                bell.innerHTML=notifTotal
            }

            if(bellicon2){
                bellicon2.innerHTML=notifTotal
            }                        
        }else{
            let offline_notif_total= +logout_notification + +(dbnotif)
            
            if(offline_notif_total > 0){
                notifTotal= +offline_notif_total
                if(bell){
                    bell.innerHTML= offline_notif_total
                }
                if(bellicon2){
                    bellicon2.innerHTML=offline_notif_total  
                }
            }
            localStorage.setItem("notificationadd", notifTotal)
            
        }
        if(notifTotal<=0 ){
            if(bell){
                bell.style.display="none"
            }
            if(bellicon2){
                bellicon2.style.display="none"
            }
        }else{
            if(bell){
                bell.style.display="flex"
            }
            if(bellicon2){
                bellicon2.style.display="flex"
            }
        }

        let xhr2 = new XMLHttpRequest();
        xhr2.open('GET',  "http://127.0.0.1:8000/reset_notif/ ", true);
        xhr2.setRequestHeader('Content-Type', 'application/json');
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === XMLHttpRequest.DONE) {
                if( xhr2.status === 200){
                    response= JSON.parse(xhr2.responseText)
                }
            }
        }
        xhr2.send()

        
        let bellicon2container =document.querySelector("#bellicon2container")
        if(bellicon2container){
            bellicon2container.onclick= function(){
                // localStorage.removeItem
                localStorage.removeItem('notificationadd')
                bellicon2.style.display="none"
            }

        }
        let belliconcontainer =document.querySelector("#belliconcontainer")
        if(belliconcontainer){
            belliconcontainer.onclick= function(){
                // localStorage.removeItem
                localStorage.removeItem('notificationadd')
                bell.style.display="none"
            }

        }
}
}
xhrfriends.send()



let bgStatus;

if(localStorage.getItem("mode")==="dark"){
bgStatus="dark"
;
}else{
bgStatus="light"
}


function checksize(){
let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

let backarrowState;
if(backarrow){
    backarrowState=backarrow.getAttribute("state")

}

if(realtimemessg && onlinechat){            
    if(screenWidth<640 && backarrowState===null){
        onlinechat.style.display="block"
        realtimemessg.style.display="none"
    }else if(screenWidth<640 && backarrowState==="false"){
        onlinechat.style.display="block"
        realtimemessg.style.display="none"
    }
    else{               
        onlinechat.style.display="none"
        realtimemessg.style.display="block"

    }
}
    
if(onlinechat){ 
    if(screenWidth>640){
        onlinechat.style.display="block"

    }
}

}

checksize()

function screenResize(){
checksize()
}

function scrollToBottom() {
messageStore.scrollTop = messageStore.scrollHeight;
}


window.addEventListener("resize", screenResize)
if(backarrow){
backarrow.onclick= function(){
    backarrow.setAttribute("state", "false")
    realtimemessg.style.display="none"
    onlinechat.style.display="block"
    onlinechatbutton.style.display="flex"
}

}
let socket=null;

if( chats ){
chats.onmouseover= function(){
    chats.style.opacity="0.4"
}
chats.onmouseout= function(){
    chats.style.opacity="1"
}
}
if(senddiv){

senddiv.onmouseover= function(){
    senddiv.style.opacity="0.4"
    senddiv.style.cursor="pointer"
}
senddiv.onmouseout= function(){
    senddiv.style.opacity="1"
}
}

// online.onmouseover= function(){
//     online.style.opacity="0.4"
// }
// online.onmouseout= function(){
//     online.style.opacity="1"
// }

let typingStore;
function initialPersonalChat(receiver){
let xhr = new XMLHttpRequest();
xhr.open('GET',  `${baseresponseUrlKey}/chat/${receiver}`, true);
xhr.setRequestHeader('Content-Type', 'application/json');
;

xhr.onerror = function () {
    ;
};

xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) { 
        if( xhr.status === 200){
        ;
        response= JSON.parse(xhr.responseText)
        let obj=JSON.parse(response.context)
        if(response.context){
            for(i of obj){
                const firstKey= Object.keys(i)[0]
                const firstValue= i[firstKey]
                let chat=document.createElement('p');
                messageStore.style.opacity="1"
                chat.style.width="fit-content"
                chat.style.padding="3px 10px"
                chat.style.marginTop="1rem"
                chat.style.borderRadius="10px"
                chat.innerHTML = firstValue 
                if( firstKey=== samePerson){
                    chat.style.alignSelf = "flex-end"
                    chat.style.backgroundColor="green"
                    chat.style.color="white"
                }else{
                    chat.style.color="white"
                    chat.style.backgroundColor="#597d35"
                    
                }                                                                                
                
            messageStore.appendChild(chat)
            scrollToBottom()
            
            }
            } 
            
    
        }else{
            ;
        }
    }
}
xhr.send()
}


function sendAndRceiveMessage(data, receiver){ 
if(data.type==="chat_message"){              
    if(data.receiver===samePerson){
        let chatelementDiv= document.createElement('div')
        let time= document.createElement('p')
        time.innerHTML=data.time
        time.style.color="gray"
        time.style.display="none"
        time.style.fontSize="12px"
        let chat= document.createElement('p')
        chat.style.width="fit-content"
        chat.style.padding="3px 10px"
        chat.style.marginTop="1rem"
        chat.style.borderRadius="10px"
        if(data.receiver===samePerson){
            chat.style.color="white"
            chat.style.backgroundColor="#597d35"
            chatelementDiv.style.alignSelf = "flex-start"
            chatelementDiv.appendChild(chat)
            chatelementDiv.appendChild(time)
        }else{
            chatelementDiv.style.float = "right"
        }
        chat.onclick= ()=>{time.style.display = "block"}
        chat.innerHTML= data.message;
        if(messageStore){
            messageStore.appendChild(chatelementDiv); 
            scrollToBottom() 
        }
    }
}   

if(data.type==="same_message"){  
    let onlinesignal = data.online
    fetchData(onlinesignal)              
    let chat= document.createElement('p')
    let chatelementDiv= document.createElement('div')
    let time= document.createElement('p')
    time.innerHTML=data.time
    time.style.color="gray"
    time.style.display="none"
    time.style.fontSize="12px"
    chat.style.width="fit-content"
    chat.style.padding="3px 10px"
    chat.style.color="black"
    chat.style.marginTop="1rem"
    chat.style.borderRadius="10px"
    if(data.receiver !== samePerson){
        chat.style.backgroundColor="green"
        chat.style.color="white"
        chat.style.alignSelf = "flex-end"
        chat.style.float = "right"
        chatelementDiv.appendChild(chat)
        chatelementDiv.appendChild(time)
    }
    chat.onclick= ()=>{time.style.display = "block"}
    // else{
    //     chat.style.backgroundColor="green"
    //     chat.style.color="white"
    //     chat.style.alignSelf = "flex-end"
    // }
    chat.innerHTML= data.message;
    messageStore.appendChild(chatelementDiv);  
    scrollToBottom()
}

}


function chatting(e, baseUserId, receiver){  
const username2 = document.querySelector('#leftnavusername');
let realtimemessg=document.querySelector("#realtimemessg")
let onlinechat=document.querySelector("#onlinechat")
let backarrow= document.querySelector("#backarrow")     
let currentDate = new Date();

let day = currentDate.getDate();
let monthIndex = currentDate.getMonth();
let year = currentDate.getFullYear();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();

// Create an array to convert month index to month abbreviation
let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Format the date as a string in the desired format
let formattedDate = day + ' ' + monthNames[monthIndex] + ' ' + hours + ':' + (minutes < 10 ? '0' : '') + minutes;

;            
if(messageStore !== null){
    messageStore.style.opacity="1"

}
let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
// ;
// ;
// ;
;
if(!profile_message){
    if(screenWidth<=640 && onlinechat !== null && backarrow !== null && realtimemessg !== null){
        onlinechat.style.display="none"
        realtimemessg.style.display="block"
        realtimemessg.style.width="100%"
        backarrow.setAttribute("state", "true")
        
    }else{
        onlinechat.style.display="block"
        backarrow.setAttribute("state", "false")

    }
}
;
if (socket !== null && socket.readyState === WebSocket.OPEN) {
    socket.close();
}  
const newprotocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const urls2 = `${newprotocol}//${window.location.host}+ /ws/messages/${baseUserId}/${receiver}/ `
socket = new WebSocket(
    // 'ws://' + window.location.host + '/ws/messages/' + baseUserId + '/' + receiver +'/'
    urls2
);

socket.onmessage = function(e) {
    const data = JSON.parse(e.data);    
    ;
    
    sendAndRceiveMessage(data, receiver)                           
    // to get private initialmessages
    // initialChat(data)
    };

socket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

if(document.querySelector('#message') !== null){
    document.querySelector('#message').focus();
    document.querySelector('#message').onkeyup = function(e) {
        if (e.key === 'Enter') {  // enter, return
            document.querySelector('#chat-message-submit').click();
        }
    };
    
    document.querySelector('#message').oninput = function(e) {

        socket.send(JSON.stringify({
            'message': "message",
            "user":username2.innerHTML,
            "receiver":receiver,
            "receiverProfile":i,
            "type":"typing"
        
        }));
    };             

    let blurTimeout;
    document.querySelector('#message').onblur = function(e) {
        clearTimeout(blurTimeout)
        let countdown=0
        // function
            const username2 = document.querySelector('#leftnavusername');
            socket.send(JSON.stringify({
                'message': "message",
                "user":username2.innerHTML,
                "receiver":receiver,
                "receiverProfile":i,
                "type":"canceltyping"
            
            }));
        
    };
}


if (document.querySelector('#chat-message-submit') !== null){
// ;
    document.querySelector('#chat-message-submit').onclick = function(e) {
        const messageInputDom = document.querySelector('#message');
        const username = document.querySelector('#leftnavusername');
        const message = messageInputDom.value;
        socket.send(JSON.stringify({
            'message': message,
            "user":username.innerHTML,
            "receiver":receiver,
            "receiverProfile":i,
            "time":formattedDate,
            "type":"instantmessage"

        }));
        messageInputDom.value = '';
            };

    } 

let profilemessageInputDom = document.querySelector('#profilemessage');
if(profilemessageInputDom !== null){
    profilemessageInputDom.focus();
    profilemessageInputDom.onkeyup = function(e) {
        if (e.key === 'Enter') {  // enter, return
            document.querySelector('#profilechat-message-submit').click();
        }
    }
}

if(document.querySelector('#profilechat-message-submit') !== null){    
    document.querySelector('#profilechat-message-submit').onclick = function(e) {
        const message = profilemessageInputDom.value;
        let sender2 = profile_message.getAttribute("sender")
        let receiver2 = profile_message.getAttribute("receiver")
        socket.send(JSON.stringify({
            'message': message,
            "user":sender2,
            "receiver":receiver2,
            "receiverProfile":receiver2,
            "time":formattedDate,
            "type":"instantmessage"
        }));
        profilemessageInputDom.value = '';
    };
}
}                                     


if(profile_message){
    profile_message.onclick= function(e, s, r){               
        let sender = profile_message.getAttribute("sender")
        let receiver = profile_message.getAttribute("receiver")
        let profile_message_input = document.querySelector('#profile_message_input');

        profile_message_input.style.display="block"   
        chatting(e,sender, receiver )
    }

}


function onlinecircle(onlinesignal, receiver2, parent){
let container=document.createElement("div")
let usernameMessage=document.createElement("div")
let username=document.createElement("p")
let messages=document.createElement("p")
messages.setAttribute("id", "messagebody")
let image=document.createElement("img")
image.setAttribute("id", `${receiver2}`)
username.style.opacity="0.9"
image.style.height="50px"
image.style.width="50px"
image.style.borderRadius="50%"
container.style.position="relative"
container.classList.add(`biggerCircle-${receiver2}`)
container.style.width="fit-content"
parent.style.cursor="pointer"
parent.style.height="fit-content"
parent.style.width="fit-content"
parent.style.width="100%"
parent.style.display="flex"
parent.style.marginTop="1rem"
parent.style.gap="20px"
parent.style.alignItems="center"
if (onlinesignal.includes(receiver2)) {
    let circle = document.createElement("div");
    let biggerCircle = document.createElement("div");
    let onlinecircleContainer = document.createElement("div");
  
    circle.style.width = "10px";
    circle.style.height = "10px";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = "lime";
  
    biggerCircle.classList.add(`container-${receiver2}`);
    biggerCircle.style.width = "15px";
    biggerCircle.style.height = "15px";
    biggerCircle.style.borderRadius = "50%";
    biggerCircle.style.backgroundColor = "black";
    biggerCircle.style.display = "flex";
    biggerCircle.style.justifyContent = "center";
    biggerCircle.style.alignItems = "center";
  
    onlinecircleContainer.style.position = "absolute";
    onlinecircleContainer.style.right = "-6%";
    onlinecircleContainer.style.top = "50%";
    onlinecircleContainer.style.transform = "translate(50%, -50%)"; // Center the container horizontally and vertically
  
    biggerCircle.appendChild(circle); // Append the lime circle inside the white circle
    onlinecircleContainer.appendChild(biggerCircle); // Append the white circle inside the onlinecircleContainer
  
    container.appendChild(onlinecircleContainer);
  }
  
  
username.innerHTML=receiver2
messages.innerHTML=i.message
typingStore= i.message
image.src =i.pics
container.append(image)
parent.append(container)
usernameMessage.append(username)
usernameMessage.append(messages)
parent.append(container)
parent.append(usernameMessage)
parent.onmouseover= function(){
    parent.style.opacity="0.4"
}
parent.onmouseout= function(){
    parent.style.opacity="1"
}

                                    
}

// fetcing initial chats with others
function fetchData(onlinesignal){
    let baseresponse;
    ;
    if(chatChat){
        chatChat.innerHTML=""
    }
    let xhrchat = new XMLHttpRequest();
    xhrchat.open('GET',  'http://127.0.0.1:8000/selfmessages', true);
    xhrchat.setRequestHeader('Content-Type', 'application/json');
    xhrchat.onreadystatechange = function () {
        if (xhrchat.readyState === XMLHttpRequest.DONE && xhrchat.status === 200) {   
            try{
                baseresponse= JSON.parse(xhrchat.responseText)
            }catch{
                baseresponse= Jxhr.responseText

            } 
            ;                          
            for(i of baseresponse.messages){
                let receiver2;
                const baseUserId2=document.querySelector("#baseuserid").innerHTML
                if(i.username===baseUserId2){
                    receiver2=i.sender
                }else{
                    receiver2=i.username
                } 
                let parent=document.createElement("div")
                
                onlinecircle(onlinesignal, receiver2, parent)

                if(chatChat){
                    chatChat.append(parent)
                }

                // private mesaage with a friend from initial chat
                parent.onclick= (e)=>{messageStore.innerHTML=""; 
                    initialPersonalChat(receiver2)
                    chatting(e, baseUserId2, receiver2)}
                
            }
                    
        }
    }
    xhrchat.send()
}


onlineSocket.onmessage = function(e){
let data = JSON.parse(e.data)
;
if(data.type==="send_like_message"){
    increase++
    if(bellicon !== null){
        document.querySelector("#bellicon").innerHTML=increase
    }
    ;
    if(bellicon2 !== null){
        bellicon2.innerHTML=increase
        bellicon2.style.display="flex"
    }
    document.querySelector("#bellicon").style.display="flex"
    let notif= localStorage.getItem("notificationadd")
    if(notif===null){
        let notificationCount=0
        notificationCount++;
        localStorage.setItem("notificationadd", notificationCount)
    }else{
        notif= +notif + 1
        localStorage.setItem("notificationadd",  notif)
    }
}

if(data.type==="send_add_message"){
    let increase= document.querySelector("#bellicon").innerHTML                
    increase++
    document.querySelector("#bellicon").innerHTML=increase
    bellicon2.innerHTML=increase
    document.querySelector("#bellicon").style.display="flex"
    let notif= localStorage.getItem("notificationadd")
    if(notif===null){
        let notificationCount=0
        notificationCount++;
        localStorage.setItem("notificationadd", notificationCount)
    }else{
        notif= +notif + 1
        localStorage.setItem("notificationadd",  notif)
    }
}

function onlinepeopleFn(e, receiver, pics){
    const baseUserId=document.querySelector("#baseuserid").innerHTML
    let parent=document.createElement("div")
    let container=document.createElement("div")
    let username=document.createElement("p")
    username.classList.add("onlineusernames")
    username.innerHTML=receiver
    let image=document.createElement("img")
    image.src =pics
    // username.style.color="white"
    username.style.opacity="0.9"
    image.style.height="50px"
    image.style.width="50px"
    image.style.borderRadius="50%"
    container.style.position="relative"
    let circle=document.createElement("div")
    circle.style.width="10px"
    circle.style.height="10px"
    circle.style.borderRadius="50%"
    circle.style.backgroundColor="lime"
    let biggerCircle=document.createElement("div")
    biggerCircle.style.width="15px"
    biggerCircle.style.height="15px"
    biggerCircle.style.borderRadius="50%"
    biggerCircle.style.backgroundColor="white"
    biggerCircle.style.position="absolute"
    biggerCircle.style.right="-6%"
    biggerCircle.style.top="50%"
    biggerCircle.style.display="flex"
    biggerCircle.style.justifyContent="center"
    biggerCircle.style.alignItems="center"
    biggerCircle.append(circle)
    container.append(biggerCircle) 
    parent.style.cursor="pointer"
    parent.style.height="fit-content"
    parent.style.width="100%"
    parent.style.display="flex"
    parent.style.gap="18px"
    parent.style.alignItems="center" 
                            
    container.append(image)
    parent.append(container)
    parent.append(username)
    onlinePeople.append(parent)
    parent.onmouseover= function(){
        parent.style.opacity="0.4"
    }
    parent.onmouseout= function(){
        parent.style.opacity="1"
    }
    // online channels connection calling the chatting function
    parent.onclick= function(e){ 
        messageStore.innerHTML=""  
        initialPersonalChat(receiver)                                           
        chatting(e, baseUserId,receiver)
        ;
    }

}


if(onlinePeople){
    if(data.type === 'online'){
        onlinePeople.innerHTML=""
        for(i of data.message){
            if(data.friends.includes(i.username)){       
                const receiver= i.username
                let pics= i.pics
                onlinepeopleFn(e ,receiver, pics)
            }
        }   
    }
}


// let chatlogoutUsername2= document.querySelector(`.container-${data.sender}`)
// ;
if(data.type==="send_logout" ){
    let allOnlineUsername= document.querySelectorAll(".onlineusernames")
    let chatlogoutUsername= document.querySelector(`.container-${data.sender}`)
    chatlogoutUsername.style.display = "none"
    for(i of allOnlineUsername){
        if(i.innerHTML === data.sender){
            let keeper = i.parentElement
            let iParent= i.parentElement.parentElement
            iParent.removeChild(keeper)
        }
    }
}

if(onlinePeople){
    if(data.type==="send_online" ){
        onlinePeople.innerHTML=""
        const receiver= data.name
        let pics = data.pics
        const baseUserId=document.querySelector("#baseuserid").innerHTML
        let image=document.querySelector(`#${receiver}`)
        let container2=document.querySelector(`.biggerCircle-${receiver}`)
        let maincontainer=document.querySelector(`.container-${receiver}`)
        ;
        ;

        if(maincontainer === null){
            let circle=document.createElement("div")
            circle.style.width="10px"
            let biggerCircle=document.createElement("div")
            circle.style.height="10px"
            circle.style.borderRadius="50%"
            circle.style.backgroundColor="lime"
            biggerCircle.style.width="15px"
            biggerCircle.style.height="15px"
            biggerCircle.style.borderRadius="50%"
            biggerCircle.style.backgroundColor="black"
            biggerCircle.style.position="absolute"
            biggerCircle.style.right="-6%"
            biggerCircle.style.top="50%"
            biggerCircle.style.display="flex"
            biggerCircle.style.justifyContent="center"
            biggerCircle.style.alignItems="center"
            biggerCircle.append(circle)
            biggerCircle.classList.add(`container-${receiver}`)

            container2.append(biggerCircle)
        }else{
            maincontainer.style.display = "flex"
        }
        onlinepeopleFn(e ,receiver, pics)
        
    }
    
}
}


logout.onclick= async()=>{
const offlineNotification =localStorage.getItem("notificationadd")
const offlinemessageNotification =localStorage.getItem("count")
let formData= new FormData()
if(offlinemessageNotification !== null || offlinemessageNotification !== undefined){
    formData.append("offlinemessageNotification", offlinemessageNotification)
}
formData.append("offlineNotification", offlineNotification)
const notifResponse = await fetch("http://127.0.0.1:8000/logout/", {
    method: 'POST',
    body: formData,
    headers: {
        'X-CSRFToken': '{{ csrf_token }}',
    },
});
if(notifResponse.ok){
    window.localStorage.clear()
    window.location.href= "http://127.0.0.1:8000/login"
    onlineSocket.send(JSON.stringify({
        'message': `${samePerson} just liked your photo`,
        "receiver":samePerson,
        "type": "loggedout",
        "sender": samePerson
    }))
}

}
const logout2 = document.querySelector("#logout2")
if(logout2 !== null){
logout2.onclick= async()=>{
    const offlineNotification =localStorage.getItem("notificationadd")
    const offlinemessageNotification =localStorage.getItem("count")
    let formData= new FormData()
    ;
    ;
    if(offlinemessageNotification !== null || offlinemessageNotification !== undefined){
        formData.append("offlinemessageNotification", offlinemessageNotification)
    }
    formData.append("offlineNotification", offlineNotification)
    const notifResponse = await fetch("http://127.0.0.1:8000/logout", {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': '{{ csrf_token }}',
        },
    });
    if(notifResponse.ok){
        window.localStorage.clear()
        ;
        window.location.href= "http://127.0.0.1:8000/login"
        onlineSocket.send(JSON.stringify({
            'message': `${samePerson} just liked your photo`,
            "receiver":samePerson,
            "type": "loggedout",
            "sender": samePerson
        }))
    }

}
}


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
};


const csrftoken = getCookie('csrftoken');

$("#myButton").click(function () {
$(".dataparent").empty();
$.ajax({
    url: "http://127.0.0.1:8000/findfriends",
    type: "GET",
    dataType: "json",
    success: function (response) {
        $("#loadingsequence2").hide()
        let appendDiv= $(".dataparent")
        ;
        ;
        response.find_friends.forEach(function (friend) {
        let savedMode = localStorage.getItem('mode');
        if(friend.username){    
            let friendDiv = $("<div>");
            friendDiv.attr("id", "findfrienddivbg");
            let container = $("<div>");
            let friendDivBg;
            if (savedMode) {
                if(savedMode==="light"){
                    friendDivBg= false;
                }else{
                    friendDivBg= true
                }
            }
            // Apply the Tailwind CSS classes to the friendDiv
            friendDiv.css({
            "width": "100%",
            "height": "80%",
            "padding": "1rem",
            "display":"flex",
            "gap":"5px",
            "justify-content":"center",
            "align-content":"center",
            "background-color":`${friendDivBg?"#1D2833":"white"} `,
            "box-shadow": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            "border-radius": "10px",
            "margin-top": "1rem",
            "margin-bottom": "1rem",
            "margin-left": "1rem",
            "margin-right": "1rem",
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
            
            // Append the elements to the friendDiv                          
            if(response.sent.includes(friend.username) || response.received.includes(friend.username)){
                let nofriend = $("<p>").text("No suggestion to fetch");
                let appendDiv2= $(".dataparent2")
                let containernofriend = $("<div>");
                containernofriend.css({"width": "100%", "text-align":"center"});

                containernofriend.append(nofriend);
                // friendDiv.append(containernofriend);
                appendDiv.hide()
                containernofriend.appendTo(appendDiv2);
            }
            else{
                appendDiv.show()
                $(".dataparent2").hide()
                let addFriend = $("<p>").text("Add friend");
                addFriend.css({
                    "width":"fit",
                    "height":"fit",
                    "padding":"6",
                    "border-radius":"5px",
                    "background-color":"rgb(22 163 74)",
                    "color":"rgb(209 213 219)",
                    "cursor":"pointer"                        
                })
                let usernameP = $("<p>").text(friend.username);
                ;
                ;
                
                (savedMode==="light" || savedMode===null)?usernameP.css({"font-size":"bold", "color":"limegreen"}): usernameP.css({"font-size":"bold", "color":"white"})
                let bio = $("<p>").text(friend.bio);
                let image = $("<img>");
                image.attr("src", friend.pics);
                image.attr("alt", "Profile Picture");
                image.addClass("w-[80px] h-[80px]" ); // Set the desired width
                image.attr("height", "60px !important");
                image.css("border-radius", "50%")
                container.css({"display": "grid", "gap":"5px"})

                container.append(usernameP);
                container.append(bio);
                container.append(addFriend);
                friendDiv.append(image);
                friendDiv.append(container)                            

                // Append the friendDiv to the dataContainer
                friendDiv.appendTo(appendDiv);
                addFriend.click(function () {
                    $.ajax({
                    url: `${response.URL_KEY}/addfriends/${friend.username}/`,
                    type: "POST",
                    dataType: "json",
                    beforeSend: function(xhr, settings) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    },
                    success: function (response) {
                        if(response.success=="ok"){
                            Toastify({
                                text: "Request sent",
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
                        
                        addFriend.text("Request sent")
                        onlineSocket.send(JSON.stringify({
                            'message': `${friend.username} sent you a friend request`,
                            "receiver":friend.username,
                            "sender": requestUser,
                            "type":"friendrequest"
                        }));
                        }else{
                            Toastify({
                                text: "Request not sent! try again later",
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
                })
                })
                    
            }
        }
    
    
    });
    },
    error: function (error) {
        ;
    }
});
});




const uploadPreview = document.getElementById('uploadPreview');
const parentmodalpreview = document.getElementById('parentmodalpreview');
const groupfileinputcontainer = document.querySelector('.group-file-input-container');
const modalpreview = document.getElementById('modalpreview');
const uploadpreviewImage = document.getElementById('uploadPreviewImage');
const uploadsubmitButton = document.getElementById('uploadsubmitButton');
const uploadCancelButton = document.getElementById('uploadcancelButton');

function previewFn(e, uploadpreviewImage, modalpreviewCancel, uploadPreview, uploadCancelButton, uploadsubmitButton, modalpreview, groupfileinputcontainer, parentmodalpreview ){
const reader = new FileReader();
let selectedFile= e.target.files[0]
let parent= e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
if (selectedFile) {
    reader.onload = function (e) {
        uploadpreviewImage.src = e.target.result;
        uploadPreview.style.display = 'block';
        parent.style.display = 'none';
    };
    reader.readAsDataURL(selectedFile);
}

uploadCancelButton.onclick = function (e) {
    uploadpreviewImage.value = "";
    uploadPreview.style.display = 'none';
    
}

modalpreviewCancel.onclick = function (e) {
    modalpreview.value = "";
    parentmodalpreview.style.display = 'none';
    groupfileinputcontainer.style.display = 'block';                
}

uploadsubmitButton.onclick = function (e) {
    uploadPreview.style.display = 'none';
    parent.style.display = 'block';
    modalpreview.style.display = 'block';
    const selectedFileUrl = URL.createObjectURL(selectedFile)
    groupfileinputcontainer.style.display = 'flex';
    groupfileinputcontainer.style.justifyContent = 'center';
    groupfileinputcontainer.style.gap = '1rem';
    parentmodalpreview.style.display = 'block';
    modalpreview.src = selectedFileUrl;

};

}

function previewFn2(e, uploadpreviewImage, modalpreviewCancel, uploadPreview, uploadCancelButton, uploadsubmitButton, modalpreview, groupfileinputcontainer, parentmodalpreview ){
const reader = new FileReader();
let selectedFile= e.target.files[0]
let parent= e.target.parentElement.parentElement.parentElement.parentElement.parentElement;

if (selectedFile) {
    reader.onload = function (e) {
        uploadpreviewImage.src = e.target.result;
        uploadPreview.style.display = 'block';
        parent.style.display = 'none';
    };
    reader.readAsDataURL(selectedFile);
}

;
uploadCancelButton.onclick = function (e) {
    uploadpreviewImage.value = "";
    uploadPreview.style.display = 'none';
    
}

uploadsubmitButton.onclick = function (e) {
    uploadPreview.style.display = 'none';
    parent.style.display = 'block';
    modalpreview.style.display = 'block';
    const selectedFileUrl = URL.createObjectURL(selectedFile)
    ;
    groupfileinputcontainer.style.display = 'flex';
    groupfileinputcontainer.style.justifyContent = 'center';
    groupfileinputcontainer.style.gap = '1rem';
    parentmodalpreview.style.display = 'block';
    modalpreview.src = selectedFileUrl;
};

modalpreviewCancel.onclick = function (e) {
    modalpreview.value = "";
    parentmodalpreview.style.display = 'none';
    groupfileinputcontainer.style.display = 'block';                
}

}


$(document).ready(function(){
let groupcreate = $('#groupcreate');            
let groupmodal = document.querySelector('#groupmodalpost'); 
let groupcreatesubmit = document.querySelector('#grouppostsubmit'); 
let groupPostmodalpreviewCancel = document.getElementById('groupPost-preview-cancel');
let groupclose = $('#groupclose'); 
let groupcreatefileinputcontainer = document.querySelector('.groupPostfile-input-container'); 
let groupPostparentmodalpreview = document.querySelector('#groupPostparentmodalpreview'); 
let groupPostmodalpreview = document.querySelector('#groupPostmodalpreview'); 

$('#home').click(function(){
    $('#sidebar').toggleClass('visible');
});
$('#sidebarCancel').click(function(){
    $('#sidebar').toggleClass('visible');
});

groupcreate.click(function(){
    groupmodal.style.display= "block"
    document.querySelector("#id_insidegroupcontent").focus()
})

groupclose.click(function(){
    groupmodal.style.display= "none"
    // groupmodal
})

if(document.querySelector("#groupcreate_id_post_file") !== null){
    document.querySelector("#groupcreate_id_post_file").addEventListener("change", (e)=>{
        previewFn(e, uploadpreviewImage, groupPostmodalpreviewCancel, uploadPreview, uploadCancelButton, uploadsubmitButton, groupPostmodalpreview, groupcreatefileinputcontainer, groupPostparentmodalpreview
        
    )})
}

let groupCreatePreviewCancel = document.querySelector("#group-preview-cancel")
let groupCreatemodalpreview = document.querySelector("#modalpreview")
let groupCreateparentmodalpreview = document.querySelector("#parentmodalpreview")
let groupcreateButton = document.querySelector("#group_id_file")

// creating group and not post
groupcreateButton.addEventListener("change", (e)=>{
    ;
    previewFn(e, uploadpreviewImage, groupCreatePreviewCancel, uploadPreview, uploadCancelButton, uploadsubmitButton, groupCreatemodalpreview, groupfileinputcontainer, groupCreateparentmodalpreview)

})

// creating a new group
$('#groupsubmit').on("click", function() {
    let name = $("#id_name").val();
    let description = $("#id_description").val();
    let formData = new FormData();
    formData.append("csrfmiddlewaretoken", "{{ csrf_token }}");
    formData.append("name", name);
    formData.append("description", description);
    // [0].files[0]);
    if($("#group_id_file")[0]){
        formData.append("cover_photo", $("#group_id_file")[0].files[0]); // Assuming you have an input with id "comment_pics"
    }
    
    $.ajax({
        method: "POST",
        url: "http://127.0.0.1:8000/create-group",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            
            if(response.success===false){
                Toastify({
                    text: "Group creation failed",
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
            }else{
                window.location.reload()
                Toastify({
                    text: "Group creation successfull",
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
            }
            // Handle the response here
            ;
        },
        error: function(error) {
            ;
            // Handle the error here
        }
    });
});


if(groupPostmodalpreviewCancel !== null){
    groupPostmodalpreviewCancel.onclick = function (e) {
        groupPostmodalpreview.value = "";
        groupPostparentmodalpreview.style.display = 'none';
        groupfileinputcontainer.style.display = 'block';                
    }
}
if(groupcreatesubmit !== null){
    groupcreatesubmit.addEventListener('click', async (e) => {
        e.preventDefault();
        let fileInput = document.querySelector("#groupcreate_id_post_file")
        let fileText = document.querySelector("#id_insidegroupcontent").value
        const formData = new FormData();
        if(fileText !== null){
            formData.append("text", fileText)
        }
        if(fileInput.files.length>0){
            formData.append('file', fileInput.files[0])
        }
        const response = await fetch(`${baseresponseUrlKey}/post-on-group/${groupname}/`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': '{{ csrf_token }}',
            },
        });

        ;
        if (response.ok) {
            groupmodal.style.display="none"
            Toastify({
                text: "Post successfull, waiting for approval ",
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
            document.querySelector('#id_insidegroupcontent').value = ""
            document.querySelector('#groupcreate_id_post_file').value = ""
            
        } else {
            Toastify({
                text: "Post unsuccessfull, please try again later ",
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
    })
}

});





$(document).ready(function () {
let likeCount = $("#likeholder");           
$.ajaxSetup({
    headers: {
        "X-CSRFToken": '{{csrf_token}}',
    },
});

$(".like-button").on("click", function () {
    let postId = $(this).data("post-id");
    let clickedButton = $(this);
        $.ajax({
            url: "http://127.0.0.1:8000/like_post",  // Replace 'like_post' with your actual URL name for liking a post
            method: "POST",
            data: { post_id: postId },
            dataType: "json",
            success: function (data) {
                likeCount.text(data.like_count);
                if (data.status==="like") {
                    clickedButton.css("color","rgb(220, 38, 38)")
                    onlineSocket.send(JSON.stringify({
                            'message': `${samePerson} just liked your photo`,
                            "receiver":data.receiver,
                            "postId": postId,
                            "sender": samePerson,
                            "type": "likepost"
                    }));
                } else {
                    const mode = localStorage.getItem('mode');
                    if(mode==="light"){
                        clickedButton.css("color","#0d2438")                                
                    }else{
                        clickedButton.css("color","white")

                    }
            
                }
            },
            error: function () {
                alert("Error occurred while processing your request.");
            },
        });           
});

$(".group-like-button").on("click", function () {
    let postId = $(this).data("post-id");
    let clickedButton = $(this);
        $.ajax({
            url: "http://127.0.0.1:8000/group_like_post",  // Replace 'like_post' with your actual URL name for liking a post
            method: "POST",
            data: { post_id: postId },
            dataType: "json",
            success: function (data) {
                likeCount.text(data.like_count);
                if (data.status==="like") {
                    clickedButton.css("color","rgb(220, 38, 38)")
                } else {
                    const mode = localStorage.getItem('mode');
                    if(mode==="light"){
                        clickedButton.css("color","#0d2438")                                
                    }else{
                        clickedButton.css("color","white")

                    }                       
                }
            },
            error: function () {
                alert("Error occurred while processing your request.");
            },
        });           
});
    
});


// increasing message count 
const leftnav= document.querySelector("#leftnavmessage")
const topmessageNav= document.querySelector("#topmessagenav")
const baserooms= document.querySelector("#baseuserid").innerHTML


// intitial user channels connection
const initialprotocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const srcs = `${initialprotocol}//${window.location.host}/ws/chat/${baserooms}/ `
// const srcs =  'ws://' + window.location.host + '/ws/chat/' + baserooms +'/'
const messagesocket = new WebSocket(srcs)


messagesocket.onmessage = function(e){
let data = JSON.parse(e.data)


if(data.type==="initialmessage"){
    if(window.location.pathname==="/messages/"){
        fetchData(data.online)
    }
    
}

if(data.type==="chat_message"){
    let onlinesignal = data.online
    fetchData(onlinesignal)
    ;
    if(window.location.pathname==="/messages/"){
        localStorage.removeItem("count")
    }else{               
        if(data.message !== ""){
            count++
            localStorage.setItem("count", count)
        }
        if( count >= 1 ){
            let messagenotif= document.querySelector("#messagenotif")
            let messagenotif2= document.querySelector("#messagenotif2")
            if(messagenotif !== null){
                messagenotif.innerHTML=count
                messagenotif.style.display="flex"
                messagenotif.style.color="white"
                messagenotif.style.justifyContent="center"
                messagenotif.style.alignItems="center"
            }
            if(messagenotif2 !== null){
                messagenotif2.innerHTML=count
                messagenotif2.style.color="white"
                messagenotif2.style.display="flex"
                messagenotif2.style.justifyContent="center"
                messagenotif2.style.alignItems="center"
            }
        }
    }
}


    if(data.type==="typing"){
        let typing=document.querySelector('#messagebody')
        if(typing !== null){
            typing.innerHTML= "Typing..."
            typing.style.color= "green"
        }
    }
    if(data.type==="canceltyping"){
        let typing=document.querySelector('#messagebody')
        if(typing !== null){
            typing.innerHTML= typingStore
            typing.style.color= "#0D2438"
        }
    }

}
    
if(leftnav){
leftnav.onclick=()=>{
    localStorage.removeItem("count")
    fetchData()
}
}



// dealing with status modals

// Get the modal element
document.addEventListener("DOMContentLoaded", function(){
const modal = document.querySelector('#modal');   
const submitButton = document.querySelector('#submit');
const statuSubmitButton = document.querySelector('#statussubmit');
const statusmodal = document.querySelector('#statusmodal');
const statusShow = document.querySelector('#status');

// Get the button to close the modal
const closeButton = document.querySelector('#button');
const statusCloseButton = document.querySelector('#statusbutton');
const fileInput = document.querySelector('#id_filepost');
const fileInputStatus = document.querySelector('#id_filestatus');

const postparentmodalpreview = document.getElementById('postparentmodalpreview');
const postfileinputcontainer = document.querySelector('.file-input-container');
const postmodalpreview = document.getElementById('postmodalpreview');
const postmodalpreviewCancel = document.getElementById('post-preview-cancel');



const statusparentmodalpreview = document.getElementById('statusparentmodalpreview');
const statusfileinputcontainer = document.querySelector('.status-file-input-container');
const statusmodalpreview = document.getElementById('statusmodalpreview');
const statusmodalpreviewCancel = document.getElementById('status-preview-cancel');





// Add event listener to the close button 
closeButton.addEventListener('click', ()=>{modal.style.display='none'});
statusCloseButton.addEventListener('click', ()=>{statusmodal.style.display='none'});

fileInput.addEventListener("change", (e)=>previewFn2(e, uploadpreviewImage, postmodalpreviewCancel, uploadPreview, uploadCancelButton, uploadsubmitButton, postmodalpreview, postfileinputcontainer, postparentmodalpreview ))


// post create
submitButton.addEventListener('click', async (e) => {
e.preventDefault();
const formData = new FormData(document.querySelector('#postform'));
if(fileInput.files.length>0){
    formData.append('file', fileInput.files[0])
}
const response = await fetch('http://127.0.0.1:8000/create_post', {
    method: 'POST',
    body: formData,
    headers: {
        'X-CSRFToken': '{{ csrf_token }}',
    },
});


if (response.ok) {
    Toastify({
        text: "Post successfull",
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
        text: "Post unsuccessfull, please try again later ",
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
window.location.reload()
});


if(statusShow){
statusShow.addEventListener("click", function(){
    statusmodal.style.display='block'
    document.querySelector('#status_content').focus();

})
} 

fileInputStatus.addEventListener("change", (e)=>previewFn2(e, uploadpreviewImage, statusmodalpreviewCancel, uploadPreview, uploadCancelButton, uploadsubmitButton, statusmodalpreview, statusfileinputcontainer, statusparentmodalpreview ))


if(statuSubmitButton){
// status create
statuSubmitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const formDatastatus = new FormData(document.querySelector('#statusform'));            
    if(fileInputStatus.files.length>0){
        formDatastatus.append('file', fileInputStatus.files[0])
    }
    const response = await fetch('http://127.0.0.1:8000/create_status', {
        method: 'POST',
        body: formDatastatus,
        headers: {
            'X-CSRFToken': '{{ csrf_token }}',
        },
    });

    
    if (response.ok) {
        // Handle success, maybe close the modal and show a success message
        window.location.reload()
        Toastify({
            text: "Status created",
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
                            
        // Reload or update the posts on the page as needed
    } else {
        Toastify({
            text: "An error occured! try again later",
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
                            
        statusmodal.style.display = 'none';
        // Handle error, maybe show an error message
    }
});
}
})
window.addEventListener('load', function() {
document.querySelector("#loadingmodal").style.display="none"
});
