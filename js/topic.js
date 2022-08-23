 // const text3 = document.querySelector(".ham")
 const ham = document.querySelector(".ham")
 const catalog = document.querySelector(".catalog")
 const content = document.querySelector(".content")
 const flat = document.querySelector(".flat")
 const flat_mid = document.querySelector(".flat-mid")
 const btn = document.querySelector(".hb-border-bottom");
 const audio = document.getElementById("jojo");
 const ran = document.getElementById("range");
 const pro = document.getElementById("pro");
 const start = document.querySelector('.start')
 const stop = document.querySelector('.stop')
 const music = document.querySelector('.music')
 const backs = document.querySelectorAll('.back')
 // const hbtn = document.querySelector('.hbtn')
 let i = 0;
 let k = 0;
 ham.addEventListener("click", function () {
     if (i == 0) {

         flat_mid.classList.add('none')
         content.classList.add('block')
         flat.classList.add('rotate-1')
         flat.classList.add('rotate-2')
         flat_mid.classList.remove('slow')
         btn.style.zIndex ='2';
         i++
     } else {

         content.classList.remove('block')
         flat_mid.classList.add('slow')
         flat_mid.classList.remove('none')
         flat.classList.remove('rotate-1')
         flat.classList.remove('rotate-2')
         btn.style.zIndex ='3';
         i = 0;
     }

 })
 // function open(a){

 //   ham.classList.add('black')
 // }
 if(ham.offsetTop == 14){
     console.log(ham.offsetTop);
     window.addEventListener("scroll", function () {
         //   console.log(scrollY);
         if (window.scrollY >= 933) {
             flat_mid.classList.remove('slow')
             flat.classList.add('black2')
             flat_mid.classList.add('black2')


             //   ham.addEventListener('click',function(){
             //     if(window.scrollY >= 436 && content.classList.contains('block')){
             //         flat.classList.remove('black2')
             //     }
             //       }) 
         }
         else if (window.scrollY < 933) {
             flat.classList.remove('black2')
             flat_mid.classList.remove('black2')
         }
     })
 } else {
    //  console.log(ham.offsetTop);
     window.addEventListener("scroll", function () {
         //   console.log(scrollY);
         if (window.scrollY >= 436) {
             flat_mid.classList.remove('slow')
             flat.classList.add('black2')
             flat_mid.classList.add('black2')


             //   ham.addEventListener('click',function(){
             //     if(window.scrollY >= 436 && content.classList.contains('block')){
             //         flat.classList.remove('black2')
             //     }
             //       }) 
         }
         else if (window.scrollY < 436) {
             flat.classList.remove('black2')
             flat_mid.classList.remove('black2')
         }
     })
 }  

//  console.log(ham);
 function ham2() {
    // console.log(flat);
    if (flat.classList.contains("switch")) {
      flat.classList.remove("switch");
 
    } else {
      flat.classList.add("switch");
    }
  };
//  ham.addEventListener('click', function () {
//      console.log(flat);
//      if (flat.classList.contains('switch')) {
//          flat.classList.remove('switch')
//      } else {
//          flat.classList.add('switch')

//      }
//  })

 // 暂停
function pauseVid() {
 audio.pause();
 start.classList.remove('start-none');
 stop.classList.remove('stop-block');
}
//开始
function playVid() {
 audio.play();
 start.classList.add('start-none');
 stop.classList.add('stop-block');

 //預設值 音量 0.0 ~ 1.0 
 music.volume = 1.0;

}
//抓li裡面的a 點擊任一連結的時候 content收回漢堡排裡面 
backs.forEach(function (back,index){
   back.addEventListener('click',function(){
       content.classList.remove("block");
         flat_mid.classList.add("slow");
         flat_mid.classList.remove("none");
         flat.classList.remove("rotate-1");
         flat.classList.remove("rotate-2");
         i=0
         ham2();
     })
 })