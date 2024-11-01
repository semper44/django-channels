document.addEventListener( "DOMContentLoaded" ,function(){
    let rightnavsearchButton= document.querySelector("#rightnavsearchButton")
    let rightnavsearchicon= document.querySelector("#rightnavsearchicon")
    let rightnavsearch= document.querySelector("#rightnavsearch")
    let rightnavsearch2= document.querySelector("#rightnavsearch2")
    let rightnavParent =document.querySelector("#rightnavParent")
    let rightnavcancel =document.querySelector("#rightnavcancel")
    let URL_KEY = 'django-channels-byf5.onrender.com'
    

    if(rightnavsearchButton !== null){
        rightnavsearchButton.addEventListener("input", ()=>{
            document.querySelector("#allrightnavsuggestions").style.display="none"
            rightnavParent.style.display="block"
            rightnavsearch.style.display="block"
            rightnavsearch2.style.display="none"
        })
    }

    if(rightnavcancel !== null){
        rightnavcancel.addEventListener("click", ()=>{
            rightnavParent.style.display="none"
            document.querySelector("#allrightnavsuggestions").style.display="block"
        })
    }
    
    if(rightnavsearchicon !== null){
        rightnavsearchicon.onclick= async (e) => {
            document.querySelector("#allrightnavsuggestions").style.display="none"
            rightnavParent.style.display="block"
            e.preventDefault();
            const formData = new FormData(document.querySelector('#rightnavsearchform'));
            const searchParams = new URLSearchParams(formData);
            const url = 'django-channels-byf5.onrender.com/search' + '?' + searchParams.toString();
    
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-CSRFToken': '{{ csrf_token }}',
                },
            });
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response
                document.querySelector("#rightnavParent").style.display="block"
                rightnavsearch2.style.display="flex"
                if(data.results.length>=1){
                    data.results.forEach(item => {
                        let parentdiv= document.createElement("div")
                        let buttonparentdiv= document.createElement("div")
                        let namesparentdiv= document.createElement("div")
                        // let imageparentdiv= document.createElement("div")
                        let profPics= document.createElement("img")
                        let username= document.createElement("p")
                        let bio= document.createElement("p")
                        let viewProfile= document.createElement("p")
                        let addfriend= document.createElement("p")
                        parentdiv.style.width="80%"
                        parentdiv.style.padding="1.5rem 0"
                        parentdiv.style.height="fit-content"
                        parentdiv.style.position="relative"
                        parentdiv.style.backgroundImage= "url("+ item.cover +")"
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
                        rightnavsearch2.append(parentdiv)
                    });  
                }else{
                    document.querySelector("#rightnavcancel").style.display="block"
                    rightnavsearch.style.display="none"
                    rightnavsearch2.innerHTML= "Search not found"
                }
            } else {
                
            }                                                       
        }

    }

    if(rightnavsearchButton !== null){
        let typingTimer;
        rightnavsearchButton.addEventListener("input",  (e) => {
            clearTimeout(typingTimer)
            typingTimer= setTimeout( async () => {
                document.querySelector("#allrightnavsuggestions").style.display="none"
                e.preventDefault();
                const formData = new FormData(document.querySelector('#rightnavsearchform'));
                const searchParams = new URLSearchParams(formData);
                const url = 'django-channels-byf5.onrender.com/search' + '?' + searchParams.toString();
    
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-CSRFToken': '{{ csrf_token }}',
                    },
                });
                // document.querySelector("#rightnavcancel").style.display="block"
                // 
                    const data = await response.json(); // Parse the JSON response
    
                    rightnavsearch.style.display="none"
                    rightnavParent.style.display="block"
                    rightnavsearch2.innerHTML=""
                    rightnavsearch2.style.display="flex"
    
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
                            // let addfriend= document.createElement("p")
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
                                // const decodedURL3 = decodeURIComponent(item.cover);
                                bio.innerHTML=item.bio
                                username.innerHTML=item.username
                                profPics.src= item.prof_pics
                                parentdiv.append(profPics)
                                viewProfile.onclick=function(){
                                    window.location.href=`${URL_KEY}/profile/${item.username} `
                                }
                                
                            }else if(item.prof_pics && item.owner){
                                username.innerHTML=item.content
                                viewProfile.onclick=function(){
                                    window.location.href=`${URL_KEY}/comments/${item.slug} `
                                }                                   
                            }
                            else{
                                username.innerHTML=item.name
                                bio.innerHTML= item.description
                                profPics.src= item.photo
                                parentdiv.append(profPics)
                                viewProfile.onclick=function(){
                                    window.location.href=`${URL_KEY}/group-view/${item.name} `
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
                            rightnavsearch2.append(parentdiv)
                        });  
                        let seeAll= document.createElement("p")
                        seeAll.innerHTML="See all"
                        seeAll.style.width = '75%';
                        seeAll.style.backgroundColor = 'white'; // Set background color
                        seeAll.style.color = '#0d2438';
                        seeAll.style.textAlign = 'center';
                        seeAll.style.cursor = 'pointer';
                        seeAll.style.border = '1px solid #00cc66';
                        seeAll.style.padding = '0.5rem 0';
                        seeAll.style.borderRadius = '10px';
                        seeAll.style.color = '#0d2438';
                        
    
                        rightnavsearch2.append(seeAll)
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
                        rightnavsearch.style.display="none"
                        rightnavsearch2.innerHTML= "Search not found"
                    }
                // } else {
                //     
                //     
                //     rightnavParent.style.display="block"
                //     document.querySelector("#allrightnavsuggestions").style.display="none"
                    
                // }
            })                                                       
        })       
    }
})
    
