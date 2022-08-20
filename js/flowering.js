const sun = document.querySelector('.sun')
const moon = document.querySelector('.moon')
const night_mountain = document.querySelector('#night-mountain')
const day_mountain = document.querySelector('#day-mountain')
const night_sky = document.querySelector('#night-sky')
const day_sky = document.querySelector('#day-sky')
const target = document.getElementById('switch-day-tag');

    const isVisible = () => {
       // 取得user browser的高度
    const windowHeight = window.innerHeight;


       //目前target和上層的距離
       //還要加上banner的大小  banner與畫面同高所以加上畫面高
       const currentTragetOffsetY = target.offsetTop + windowHeight - window.pageYOffset;
       
       // 檢查target距離目前頂端的距離
       // target目前距離頂端的距離 = target.offsetTop - user已經滾動的距離
       // 判斷target目前距離頂端的距離，是否小於user的視窗大小
       // 如果小於user的視窗大小，表示目標已經在畫面之中    
       if (currentTragetOffsetY <= windowHeight) {
        sun.style.animationPlayState = 'running'
        moon.style.animationPlayState = 'running'
        night_mountain.classList.remove('night')
        day_mountain.classList.add('night')
        night_sky.classList.remove('night')
        day_sky.classList.add('night')
       } 
          
    };
    
    // 監聽scroll和resize事件
    window.addEventListener('scroll', isVisible);
    window.addEventListener('resize', isVisible);