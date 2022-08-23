// document.body.style.position = 'fixed'
document.body.style.overflowY = 'hidden'
window.onload = function () {
    setTimeout(function(){
        const test = document.querySelector('#loading')
        test.style.opacity = '0'
        document.body.style.overflowY = 'scroll'
    }, 2000)
    setTimeout(function () {
        const test = document.querySelector('#loading')
        test.style.display = 'none'
        // document.body.style.position = 'unset'
        console.log('123');
    }, 5000)
}

       // Wrap every letter in a span
var textWrapper = document.querySelector('.ml12');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.ml12 .letter',
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 + 30 * i
    }).add({
        targets: '.ml12 .letter',
        translateX: [0, -30],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 1100,
        delay: (el, i) => 100 + 30 * i
    });