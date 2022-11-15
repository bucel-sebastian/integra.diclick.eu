let slides = document.querySelectorAll(".slide");
let bullets = document.querySelectorAll('.slider-bullet');

numSlides=slides.length;

let index = 0;


function showSlide(index){
    if(index===0){
        for(i=0;i<numSlides;i++){
            slides[i].classList.remove("active-slide");
            slides[i].classList.remove("inactive-slide");
            bullets[i].classList.remove("active-bullet");
            slides[i].classList.remove("next-slide");
        }
        slides[numSlides-1].classList.add("inactive-slide");
        slides[index].classList.add("active-slide");
        bullets[index].classList.add("active-bullet");
        slides[index+1].classList.add("next-slide");
    }
    else if(index>0 && index<numSlides){
        for(i=0;i<numSlides;i++){
            slides[i].classList.remove("active-slide");
            slides[i].classList.remove("inactive-slide");
            slides[i].classList.remove("next-slide");
            bullets[i].classList.remove("active-bullet");

        }
        slides[index-1].classList.add("inactive-slide");
        slides[index].classList.add("active-slide");
        bullets[index].classList.add("active-bullet");
        if(index+1!=numSlides){
            slides[index+1].classList.add("next-slide");
        }
        else{
            slides[0].classList.add("next-slide");
        }
    }

}

function setSlide(bullet){
    index=bullet;
    clearInterval(timmer);
    showSlide(index);
    timmer=setInterval(() => {
        if(index+1===numSlides){
            index=0;
            showSlide(index);
        }
        else{
            index++;
            showSlide(index);
        }
    }, 5000);;
}


showSlide(index);
let timmer=setInterval(() => {
    if(index+1===numSlides){
        index=0;
        showSlide(index);
    }
    else{
        index++;
        showSlide(index);
    }
}, 5000);