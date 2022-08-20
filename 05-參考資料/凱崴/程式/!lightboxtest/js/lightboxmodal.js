//待修改
function openModal() {
    document.getElementById("myModal").style.display = "block";
    //因為position fixed會打架所以直接拔掉nav的按鈕
    // document.querySelector('#banner .ham').style.display="none";
    // document.querySelector('#banner .catalog').style.display="none";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
    //恢復按鈕
    // document.querySelector('#banner .ham').style.display="block";
    // document.querySelector('#banner  .catalog').style.display="block";
}

function plusSlides(n) {
    const pics = document.querySelectorAll('#afps .afps-img')
    const flowertexts = document.querySelectorAll('#afdcob-text-flowertype-block .flowertype');
    for (let i = 0; i < pics.length; i++) {
        if (pics[i].classList.contains('afps-img-active')) {
            pics[i].classList.remove('afps-img-active');
            let nextactive = (i + pics.length + n) % (pics.length);
            pics[nextactive].classList.add('afps-img-active');
            break;
            // console.log(pic)
            // console.log(num);
        }
    }
    for (let i = 0; i < flowertexts.length; i++) {
        if (flowertexts[i].classList.contains('flowertype-active')) {
            flowertexts[i].classList.remove('flowertype-active');
            let nextactive=(i+flowertexts.length+n)%(flowertexts.length);
            flowertexts[nextactive].classList.add('flowertype-active');
            break;
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

const areas = document.querySelectorAll('#map-svg .area-hover-effect');
console.log(areas)
areas.forEach(function (area, num) {
    area.addEventListener('click', function () {
        openModal();
        let areaname = area.getAttribute("data-areaname");
        //有順利抓到attribute裡面藏的資料
        // console.log(areaname);
        // console.log(typeof(areaname));
        flowermap_filter(areaname, 0);
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


fetch('./json/臺中市賞花景點.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (mydata) {
        const afps_img = document.getElementById('afps');
        for (let i = 0; i < mydata.length; i++) {
            afps_img.innerHTML += `
        <img src="${mydata[i].locationpic}" alt="" class="afps-img afps-img0 afps-img-active">
        `
        }
        afps_img.textContent = '';
        console.log('testya');
    })



function flowermap_filter(area, index) {
    const array_imgsrc = [];
    const array_flowertype = [];
    const array_area_location = [];
    // let string_locationname = "";
    let string_locationaddress = "";
    //=======================圖片區start===================================================
    //定位出要塞圖片的區域，採用id抓取
    const afps_img = document.getElementById('afps');
    console.log(afps_img);
    //先將圖片區都清掉
    afps_img.textContent = ` `;
    //將左右的按鈕復原
    // afps_img.innerHTML += `
    // <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    // <a class="next" onclick="plusSlides(1)">&#10095;</a>
    // `;
    //=======================圖片區end===================================================

    //=======================說明區start===================================================
    const afd = document.getElementById('afd');
    console.log(afd);
    // 清空內容
    afd.textContent = ``;
    //舊版QQ
    //     afd.innerHTML += ` 
    //     <div class="areabody-flower-description" id="afd">
    //     <div class="afd-title" id="afd-title">
    //       <div class="afd-title-location"></div> 
    //     </div>
    //     <div class="afd-content" id="afd-content">
    //       <div class="afd-content-name-address-block">
    //         <div class="name"></div>
    //         <div class="icon-text">
    //           <div class="icon"></div>
    //           <div class="address"></div>
    //         </div>
    //       </div>
    //       <div class="afd-content-type-map-block">
    //         <div class="icon-text">
    //           <div class="icon"></div>
    //           <div class="type"></div>
    //         </div>
    //         <a href="" id="afd-map-href">
    //             <div class="map-block">
    //                 <div class="icon-text">
    //                      <div class="icon"></div>
    //                      <div class="waytogo">導航怎麼去 Go!</div>
    //                  </div>
    //              </div>
    //         </a>
    //       </div>
    //       <div class="afd-content-weathercard-block">

    //       </div>
    //     </div>
    //   </div>
    //     `;

    //先新增好結構,之後才可以抓取到元素
    afd.innerHTML += `
<div class="afd-title" id="afd-title">
    <div class="afd-title-text">
         <p><span></span></p>
    </div>
</div>
<div class="afd-content" id="afd-content">
    <div class="afdcob-weather-block">
        <div class="weather-icon"><i class="fa-solid fa-cloud-sun"></i></div>
        <div class="weather-text-big-block">
            <div class="weather-text-briefly">
                <p><span id="afd-weather-brieflytext"></span></p>
            </div>
            <div class="weather-text-temp-rain-block">
                <div class="tempblock">
                    <div class="icon-text">
                        <p>
                            <span><i class="fa-solid fa-temperature-half"></i></span>
                            <span id="afd-weather-temptext"></span>
                        </p>
                    </div>
                </div>
                <div class="rainblock">
                    <div class="icon-text">
                        <p>
                            <span><i class="fa-solid fa-umbrella"></i></span>
                            <span id="afd-weather-raintext"></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="afd-content-other-block">
        <div class="afdcob-text" id="afdcob-text">
            <div class="afdcob-text-namd">
                <div class="text-icon">
                    <p>
                        <span id="afdcob-text-name-text"></span>
                        <Span>
                            <a href="" id="lightbox-map-link-phone">
                            <i class="fa-solid fa-map-location-dot"></i>
                            </a>
                        </Span>
                    </p>
                </div>
            </div>
            <div class="afdcob-text-flowertype">
                <div class="icon-text">
                    <p>
                        <span><i class="fa-brands fa-pagelines"></i></span>
                        <p id="afdcob-text-flowertype-block">
                        </p>
                    </p>
                </div>
            </div>
            <div class="afdcob-text-address">
                <div class="icon-text">
                    <p>
                        <span><i class="fa-solid fa-map-location-dot"></i></span>
                        <span id="afdcob-text-address-text"></span>
                    </p>
                </div>
            </div>
            <div class="afdcob-text-map">
                <a href="" id="lightbox-map-link-desktop">
                    <div class="icon-text">
                        <p>
                            <span><i class="fa-solid fa-map-location-dot"></i></span>
                            <span>導航怎麼去 GO!</span>
                        </p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
`;
    //=======================說明區end===================================================

    //=======================地點區start===================================================
    const ali_block = document.getElementById('ali');
    console.log(ali);
    ali_block.textContent = `
        
    `;
    //=======================地點區end===================================================

    //=======================說明區內容==================================================
    const afd_title_text = document.querySelector('#afd-title .afd-title-text p span');
    // console.log(afd_title_text);
    const afd_weather_briefly_text = document.getElementById('afd-weather-brieflytext');
    console.log(afd_weather_briefly_text);
    const afd_temp_text = document.getElementById('afd-weather-temptext');
    const afd_rain_text = document.getElementById('afd-weather-raintext');
    const afdcob_name_text = document.getElementById('afdcob-text-name-text');
    const afdcob_flowertype_block = document.getElementById('afdcob-text-flowertype-block');
    const afdcob_address_text = document.getElementById('afdcob-text-address-text');
    //=======================連結區=======================================================
    const a_googlelink_phone = document.getElementById('lightbox-map-link-phone');
    const a_google_link_desktop = document.getElementById('lightbox-map-link-desktop');





    fetch('./json/臺中市賞花景點.json')
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
            for (let i = 0; i < array_area_location.length; i++) {
                let iconnum = i + 1;
                ali_block.innerHTML += `
                <div class="area-location areabody-location${iconnum}" onclick="flowermap_filter('${area}',${i})">${array_area_location[i]}</div>
                `
            }


            //fetch的每筆資料再處理
            for (let i = 0; i < mydata.length; i++) {
                //根據每筆資料的地點是否符合function給定的index值，去篩選出該地點的相關資訊
                if (mydata[i].地點 == array_area_location[index]) {
                    array_imgsrc.push(`${mydata[i].locationpic}`);
                    array_flowertype.push(`${mydata[i].花種}`);
                    // string_locationname = mydata[i].地點;
                    string_locationaddress = mydata[i].地址;
                }
            }
            if (array_imgsrc.length == 1) {
                //只有一張圖的話這邊就不需要左右的按鈕了,所以重置一次areabody-flower-pic-swiper區塊
                // afps_img.textContent = ` `;
            }
            else {
                afps_img.innerHTML += `
                <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                <a class="next" onclick="plusSlides(1)">&#10095;</a>
                `;
            }
            // 依序插入圖片
            afps_img.innerHTML += `
            <img src="${array_imgsrc[0]}" alt="" class="afps-img afps-img0 afps-img-active">
            `
            for (let i = 1; i < array_imgsrc.length; i++) {
                afps_img.innerHTML += `
                <img src="${array_imgsrc[i]}" alt="" class="afps-img afps-img${i}">
                `
            }

            //插入area-floewer-description資訊
            //eg.和平區
            afd_title_text.innerHTML += `${area}`;
            //eg.
            afdcob_name_text.innerHTML += `${array_area_location[index]}`;
            afdcob_flowertype_block.innerHTML += `<span>賞花種類:</span><span class="flowertype flowertype-active">${array_flowertype[0]}</span>`;
            for (let i = 1; i < array_flowertype.length; i++) {
                afdcob_flowertype_block.innerHTML += `
                <span>、</span>
                <span class="flowertype">${array_flowertype[i]}</span>
                `
            }
            afdcob_address_text.innerHTML+=`
            ${string_locationaddress}
            `;
        })

    fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-073?Authorization=CWB-4305977E-C979-416B-B5F0-7A4C2C7CBABA&format=JSON')
        .then(function (response) {
            return response.json();
        })
        .then(function (mydata) {
            const shortcut=mydata.records.locations[0].location;
            console.log(shortcut);
            // console.log(afd);
            let locationnum=0;
            //取出我們現在所要的區域真正對應到氣象局的是哪個陣列的資料
            for(let i=0;i<shortcut.length;i++){
                if(shortcut[i].locationName==area){
                    locationnum=i;
                    break;
                }
            }
            //抓到真正的區域ok
            console.log(shortcut[locationnum].locationName);
            const brieflyshortcut=shortcut[locationnum].weatherElement[1].time[0].elementValue[0].value;
            // console.log(shortcut[locationnum].weatherElement[1].time[0].elementValue[0].value)
            //待修改 之後可以利用當前時間再去判斷要插入哪一筆資料:主要是time的位子
            afd_weather_briefly_text.innerHTML+=`${brieflyshortcut}`;
            const tempshortcut=shortcut[locationnum].weatherElement[3].time;
            console.log(tempshortcut);
            let int_low_temp=30;
            let int_high_temp=0;
            //這邊只取到8因為只想看前八筆資料,代表當天的資料,去抓取當天最高&最低氣溫
            for(let i=0;i<8;i++){
                if(tempshortcut[i].elementValue[0].value<int_low_temp){
                    int_low_temp=tempshortcut[i].elementValue[0].value;
                }
                if(tempshortcut[i].elementValue[0].value>int_high_temp){
                    int_high_temp=tempshortcut[i].elementValue[0].value;
                }
            }
            afd_temp_text.innerHTML+=`${int_low_temp}℃-${int_high_temp}℃`;
            //待修改 之後需要用當前時間判斷
            const rainshortcut=shortcut[locationnum].weatherElement[0].time[1].elementValue[0].value;
            afd_rain_text.innerHTML+=`降雨機率:${rainshortcut}%`
        })
}













//測試圖片是否皆為有效連結用
function imgtest() {
    fetch('./json/臺中市賞花景點.json')
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


//測試台中未來兩天天氣api是否正確抓取
//台中各區氣象資訊 https://opendata.cwb.gov.tw/dataset/warning/F-C0032-021
//https://opendata.cwb.gov.tw/opendatadoc/MFC/A0012-001.pdf   說明文件
function weatherfetchtest() {
    fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-073?Authorization=CWB-4305977E-C979-416B-B5F0-7A4C2C7CBABA&format=JSON')
        .then(function (response) {
            return response.json();
        })
        .then(function (mydata) {
            console.log('testbbb');
            console.log(mydata);
            console.log('testaaa');
        })
}


