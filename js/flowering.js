const sun = document.querySelector('.sun')
const moon = document.querySelector('.moon')
const night_mountain = document.querySelector('#night-mountain')
const day_mountain = document.querySelector('#day-mountain')
const night_sky = document.querySelector('#night-sky')
const day_sky = document.querySelector('#day-sky')

const dayToNight = document.getElementById('switch-dayToNight-tag');
const nightToDay = document.getElementById('switch-nightToDay-tag')
const nightToDay2 = document.getElementById('switch-nightToDay-tag-2')
const text = document.querySelector('#flowering .text h2')


const isVisible = () => {
   // console.dir(text);
   // 取得user browser的高度
   const windowHeight = window.innerHeight;
   let value = window.scrollY
       //目前target和上層的距離
       //還要加上banner的大小  banner與畫面同高所以加上畫面高
       const dayToNightOffsetY = dayToNight.offsetTop + windowHeight - window.pageYOffset;
       const nightToDayOffsetY = nightToDay.offsetTop + nightToDay2.offsetTop + windowHeight - window.pageYOffset;
      //  console.log(dayToNightOffsetY);
       // 檢查target距離目前頂端的距離
       // target目前距離頂端的距離 = target.offsetTop - user已經滾動的距離
       // 判斷target目前距離頂端的距離，是否小於user的視窗大小
       // 如果小於user的視窗大小，表示目標已經在畫面之中    
       if (dayToNightOffsetY <= windowHeight) {
         sun.classList.add('sun-dayToNight')
         sun.classList.remove('sun-nightToDay')
         moon.classList.add('moon-dayToNight')
         moon.classList.remove('moon-nightToDay')
         sun.style.animationPlayState = 'running'
         moon.style.animationPlayState = 'running'
         night_mountain.classList.remove('op1-0')
         night_sky.classList.remove('op1-0')
         night_mountain.classList.add('op0-1')
         night_sky.classList.add('op0-1')
         day_mountain.classList.add('op1-0')
         day_sky.classList.add('op1-0')
         day_mountain.classList.remove('op0-1')
         day_sky.classList.remove('op0-1')
         text.style.color = '#fff'
         // night_sky.style.transform = `translateY(${(value -1400) * 0.3}px)`
      } else if(nightToDayOffsetY >= windowHeight){
         if(sun.classList.contains('sun-dayToNight')){
            sun.classList.remove('sun-dayToNight')
            sun.classList.add('sun-nightToDay')
            moon.classList.remove('moon-dayToNight')
            moon.classList.add('moon-nightToDay')
            night_mountain.classList.add('op1-0')
            night_sky.classList.add('op1-0')
            night_mountain.classList.remove('op0-1')
            night_sky.classList.remove('op0-1')
            day_mountain.classList.remove('op1-0')
            day_sky.classList.remove('op1-0')
            day_mountain.classList.add('op0-1')
            day_sky.classList.add('op0-1')
            text.style.color = '#000'
         }
         
      }
      if(window.innerWidth > 1400){
         night_sky.style.transform = `translateY(${(value -1400) * 0.28}px)`
      }
   };


    
    // 監聽scroll和resize事件
    window.addEventListener('scroll', isVisible);
    window.addEventListener('resize', isVisible);