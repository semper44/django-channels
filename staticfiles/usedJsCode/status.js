const swiper=new Swiper(".swiper",{breakpoints:{0:{slidesPerView:3,spaceBetween:2},400:{slidesPerView:3},640:{slidesPerView:4},768:{slidesPerView:5},1024:{slidesPerView:5}}});window.onload=function(){let e=new Swiper("#swiper",{slidesPerView:1,spaceBetween:10,effect:"slide",navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),t=document.querySelector("#swiperstatusclick");t&&(t.onclick=function(t){var l,r;let n;r=l=JSON.parse(statusData=null===t.target.parentElement.children[0].querySelector("#item")?t.target.parentElement.parentElement.parentElement.children[0].querySelector("#item").innerHTML:t.target.parentElement.children[0].querySelector("#item").innerHTML).reverse(),n=document.querySelector("#swiper-wrapper"),r.forEach(function(e){let t=document.createElement("div");document.createElement("p"),t.className="swiper-slide",t.classList.add("relative", 'h-[80%]', "w-[300px]", 'flex', 'flex-col', 'justify-center'),e.file?null!==e.text?t.innerHTML=`
                    <!-- Status content here -->
                    <img class=" w-full  h-full min-h-[450px] rounded-lg" src="${e.file}" alt="${e.text}">
                    <p class="w-full text-center h-fit text-white bg-black bg-opacity-40 backdrop-blur-sm p-5 absolute" >${e.text}</p>
                `:t.innerHTML=`
                    <!-- Status content here -->
                    <img class=" w-full h-full min-h-[450px] rounded-lg" src="${e.file}" alt="${e.text}">
                    `:null!==e.text?t.innerHTML=`
                    <!-- Status content here -->
                    <img class="w-full  h-full min-h-[450px] rounded-lg" src="${e.cover_photo}" alt="${e.text}">
                    <p class="w-full text-center h-fit text-white bg-black bg-opacity-40 backdrop-blur-sm p-5 absolute" >${e.text}</p>
                `:t.innerHTML=`
                    <!-- Status content here -->
                    <img class=" w-full h-full min-h-[450px] rounded-lg" src="${e.cover_photo}" alt="${e.text}">
                    `,n.appendChild(t)}),e.update(),document.getElementById("modal-overlay").style.display="block"}),(statusCancel=document.querySelector("#status_view-cancel")).onclick=function(){document.querySelector("#swiper-wrapper").innerHTML="",document.querySelector("#modal-overlay").style.display="none"}};