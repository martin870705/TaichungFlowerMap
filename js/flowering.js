const sun = document.querySelector('.sun')
const moon = document.querySelector('.moon')
const night_mountain = document.querySelector('#night-mountain')
const day_mountain = document.querySelector('#day-mountain')
const night_sky = document.querySelector('#night-sky')
const day_sky = document.querySelector('#day-sky')

window.addEventListener("scroll", function () {
    if(window.scrollY > 1600){
        sun.style.animationPlayState = 'running'
        moon.style.animationPlayState = 'running'
        night_mountain.classList.remove('night')
        day_mountain.classList.add('night')
        night_sky.classList.remove('night')
        day_sky.classList.add('night')
        }
    })