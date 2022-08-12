function openModal() {
    document.getElementById("myModal").style.display = "block";
  }
  
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  
//   function printx(x){
//     console.log(x);
//   }
  
const btns=document.querySelectorAll('#lightbox-test1 #container .button');
const afps=document.getElementById('afps');
//確認有抓到全部的按鈕
// console.log(btns);
  function insert_afps(){
    
  } 

btns.forEach(function(btn,num){
    num=num+1;
    btn.addEventListener('click',function(){
        //確認有沒有抓到個別按鈕,ok
        //num從1開始算(因前面已經+1，原本從0開始)
        console.log(btn);
        console.log(num);
        openModal();
        
    })

});

const divimgtest=document.getElementById('imgtest');
console.log(divimgtest);
function imgtest(){
    fetch('./臺中市賞花景點.json')
    .then(function(response){
        return response.json();
    })
    .then(function(mydata){
        for(i=0;i<mydata.length;i++){
            console.log(mydata[i].locationpic);
            divimgtest.innerHTML+=`
            <img src=" ${mydata[i].locationpic}" alt="">
            `
        }
        // console.log(mydata[0]);
    })
}