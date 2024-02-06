console.log('two')

const swiper = new Swiper('.swiper', {
    
    // loop: true,
    breakpoints: {
        // Breakpoint from 0 up
        0: {
            slidesPerView: 3,
            spaceBetween: 2,
        },
        400: {
            slidesPerView: 3,
        },
        // Breakpoint from 640 up
        640: {
            slidesPerView: 4,
        },
        // Breakpoint from 768 up
        768: {
            slidesPerView: 5,
        },
        // Breakpoint from 1024 up
        1024: {
            slidesPerView: 5,
        }
    }
});


window.onload = function () {
    // Initialize Swiper
    const statusSwiper = new Swiper('.swiper-container', {
        // Optional: Add other Swiper configurations here
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
        
    // Function to open the modal and populate Swiper with data from custom attribute
    function openModal(statusData) {
        console.log('notokk1')
        addSwiperSlides(statusData);
        document.getElementById('modal-overlay').style.display = 'block';
    }


    // Function to add Swiper slides
    function addSwiperSlides(statuses) {
        let swiperWrapper = document.querySelector('#swiper-wrappers');

        statuses.forEach(function(status) {
            let slide = document.createElement('div');            
            slide.className = 'swiper-slide';
            slide.classList.add( "relative", "w-[300px]")
            if(status.file){
                (status.text !== null)?slide.innerHTML = `
                    <!-- Status content here -->
                    <img class=" w-full  h-full min-h-[450px] rounded-lg" src="${status.file}" alt="${status.text}">
                    <p class="w-full text-center h-fit top-1/2 left-1/2 transform -translate-y-[1/2] -translate-x-1/2 text-white bg-black bg-opacity-40 backdrop-blur-sm p-5 absolute" >${status.text}</p>
                `:
                    slide.innerHTML = `
                    <!-- Status content here -->
                    <img class=" w-full h-full min-h-[450px] rounded-lg" src="${status.file}" alt="${status.text}">
                    `;

            }else{
                (status.text !== null)?slide.innerHTML = `
                    <!-- Status content here -->
                    <img class="w-full  h-full min-h-[450px] rounded-lg" src="${status.owner}" alt="${status.text}">
                    <p class="w-full text-center h-fit top-1/2 left-1/2 transform -translate-y-[1/2] -translate-x-1/2 text-white bg-black bg-opacity-40 backdrop-blur-sm p-5 absolute" >${status.text}</p>
                `:
                    slide.innerHTML = `
                    <!-- Status content here -->
                    <img class=" w-full h-full min-h-[450px] rounded-lg" src="${status.owner}" alt="${status.text}">
                    `;
            }

            swiperWrapper.appendChild(slide);
            statusSwiper.update()
        });

    }
    
    // Retrieve the custom attribute data when a status card is clicked
    const swiperstatusclick = document.querySelector("#swiperstatusclick")

    if(swiperstatusclick){
        swiperstatusclick.onclick = function(e){
            console.log('notokk')

            
            // let statusData = e.target.parentElement.children[0].querySelector("#item").innerHTML;
            if(e.target.parentElement.children[0].querySelector("#item") === null){
                statusData= e.target.parentElement.parentElement.parentElement.children[0].querySelector("#item").innerHTML

            }else{
                statusData = e.target.parentElement.children[0].querySelector("#item").innerHTML;
            }
            let parsedData= JSON.parse(statusData).reverse()
            openModal(parsedData);
        }
    }

    statusCancel = document.querySelector("#status_view-cancel")

    statusCancel.onclick= function(){
        document.querySelector("#swiper-wrapper").innerHTML = ""
        document.querySelector("#modal-overlay").style.display= "none"
    }
}

