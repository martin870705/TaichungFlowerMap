function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function plusSlides(n) {
    const pics=document.querySelectorAll('#afps .afps-img')
    for(let i=0;i<pics.length;i++){
        if(pics[i].classList.contains('afps-img-active')){
            pics[i].classList.remove('afps-img-active');
            let nextactive=(i+pics.length+n)%(pics.length);
            pics[nextactive].classList.add('afps-img-active');
            break;
            // console.log(pic)
            // console.log(num);
        }
    }

    //失敗案例:不可以用foreach來寫↓
    // pics.forEach(function(pic,num) {
    //     if(pic.classList.contains('afps-img-active')){
    //         pic.classList.remove('afps-img-active');
    //         let nextactive=(num+n)%(pics.length);
    //         pics[nextactive].classList.add('afps-img-active');
    //         console.log(pic)
    //         console.log(num);
    //     }
    // });
}

const areas =document.querySelectorAll('#map-svg .area-hover-effect');
console.log(areas)
areas.forEach(function(area,num) {
    area.addEventListener('click',function(){
        openModal();
        let areaname=area.getAttribute("data-areaname");
        //有順利抓到attribute裡面藏的資料
        // console.log(areaname);
        // console.log(typeof(areaname));
        flowermap_filter(areaname,0);
        
    })
});

const btns = document.querySelectorAll('#lightbox-test1 .container .button');
//確認有抓到全部的按鈕
// console.log(btns);

btns.forEach(function (btn, num) {
    num = num + 1;
    btn.addEventListener('click', function () {
        //確認有沒有抓到個別按鈕,ok
        //num從1開始算(因前面已經+1，原本從0開始)
        // console.log(btn);
        // console.log(num);
        openModal();
    })
});



fetch('../json/臺中市賞花景點.json')
.then(function (response) {
    return response.json();
})
.then(function(mydata){
    const afps_img = document.getElementById('afps');
    for(let i=0;i<mydata.length;i++){
        afps_img.innerHTML+=`
        <img src="${mydata[i].locationpic}" alt="" class="afps-img afps-img0 afps-img-active">
        `
    }  
    afps_img.textContent='';
    console.log('testya');
})



function flowermap_filter(area, index) {
    const array_imgsrc = [];
    const array_flowertype = [];
    const array_area_location = [];
    let string_locationname = "";
    let string_locationaddress = "";
    //=======================圖片區start===================================================
    //定位出要塞圖片的區域，採用id抓取
    const afps_img = document.getElementById('afps');
    console.log(afps_img);
    //先將圖片區都清掉
    afps_img.textContent = ` `;
    //將左右的按鈕復原
    afps_img.innerHTML += `
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
    `;
    //=======================圖片區end===================================================

    //=======================說明區start===================================================
    const afd_text = document.getElementById('afd');
    console.log(afd);
    // 清空內容
    afd_text.textContent = ` `;
    //=======================說明區end===================================================

    //=======================地點區start===================================================
    const ali_block = document.getElementById('ali');
    console.log(ali);
    ali_block.textContent = ` `;
    //=======================地點區end===================================================


    fetch('../json/臺中市賞花景點.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (mydata) {
            for (let i = 0; i < mydata.length; i++) {
                if (mydata[i].行政區 == area) {
                    // array_imgsrc.push(`${mydata[i].locationpic}`);
                    // array_flowertype.push(`${mydata[i].花種}`);
                    // string_locationname = mydata[i].地點;
                    // string_locationaddress = mydata[i].地址;
                    if (array_area_location.includes(`${mydata[i].地點}`)) {
                        // console.log('測試');
                    }
                    else {
                        array_area_location.push(`${mydata[i].地點}`);
                    }
                }
            }
            //從行政區抓取下面有哪些景點 ok!!!
            // console.log(array_area_location);

            //利用array_area_location的長度(代表該區有幾個不同的點)決定for迴圈要做幾次
            //接著插入地點的block(待設計安排)
            for (let i = 1; i <= array_area_location.length; i++) {
                let iconnum = i - 1;
                ali_block.innerHTML += `
                <div class="area-location areabody-location${i}" onclick="flowermap_filter('${area}',${iconnum})">${i}</div>
                `
            }


            //fetch的每筆資料再處理
            for (let i = 0; i < mydata.length; i++) {
                //根據每筆資料的地點是否符合function給定的index值，去篩選出該地點的相關資訊
                if (mydata[i].地點 == array_area_location[index]) {
                    array_imgsrc.push(`${mydata[i].locationpic}`);
                    array_flowertype.push(`${mydata[i].花種}`);
                    string_locationname = mydata[i].地點;
                    string_locationaddress = mydata[i].地址;
                }
            }

            if (array_imgsrc.length == 1) {
                //只有一張圖的話這邊就不需要左右的按鈕了,所以重置一次areabody-flower-pic-swiper區塊
                afps_img.textContent = ` `;
            }
            // 依序插入圖片
            afps_img.innerHTML+=`
            <img src="${array_imgsrc[0]}" alt="" class="afps-img afps-img0 afps-img-active">
            `
            for (let i = 1; i < array_imgsrc.length; i++) {
                afps_img.innerHTML += `
                <img src="${array_imgsrc[i]}" alt="" class="afps-img afps-img${i}">
                `
            }
            //插入該地點介紹
            afd_text.innerHTML += `
            <ul>
            <li>
                 <div class="afd_li_title">行政區:</div>
                 <div class="afd_li_content">${area}</div>
            </li>
            <li>
                <div class="afd_li_title">地點:</div>
                 <div class="afd_li_content">${string_locationname}</div>
            </li>
            <li>
                <div class="afd_li_title">地址</div>
                <div class="afd_li_content">${string_locationaddress}</div>
            </li>
            <li>
                <div class="afd_li_title">花種:</div>
                <div class="afd_li_content">${array_flowertype}</div>
            </li>
            </ul>
            `;
        })
}


//測試圖片是否皆為有效連結用
function imgtest() {
    fetch('../json/臺中市賞花景點.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (mydata) {
            for (let i = 0; i < mydata.length; i++) {
                console.log(mydata[i].locationpic);
                divimgtest.innerHTML += `
            <img src=" ${mydata[i].locationpic}" alt="">
            `
            }
            // console.log(mydata[0]);
        })
}

//台中各區氣象資訊 https://opendata.cwb.gov.tw/dataset/warning/F-C0032-021
//https://opendata.cwb.gov.tw/opendatadoc/MFC/A0012-001.pdf   說明文件
function weatherfetchtest(){
    fetch('http://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-073?Authorization=CWB-4305977E-C979-416B-B5F0-7A4C2C7CBABA&format=JSON')
    .then(function(response){
        return response.json();
    })
    .then(function(mydata){
        console.log(mydata);
        console.log('testaaa');
    })
}
