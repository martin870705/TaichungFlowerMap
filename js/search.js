const choose_places = document.querySelector('#places')//選擇地點
const choose_mouth = document.querySelector('#mouth')//選擇月份
const choose_flower = document.querySelector('#flower')//選擇花
const flower_icon = document.querySelector('#icon')//放icon
const flower_box = document.querySelector('#flower-box')//放花資訊

let areaTag = ''
let placesTag = ''

// test.innerHTML = FLOWERS[0].tag.join('、')

fetch('./json/臺中市賞花景點.json')//抓取資料
    .then(function (response) {
        return response.json();
    }).then(function (datas) {
        datas.forEach(function (data) {
            if (data.行政區 != areaTag) {//判斷列表內是否有目前行政區
                choose_places.innerHTML += `<optgroup label="${data.行政區}">`//沒有就將行政區寫入標題
                if (data.地點 != placesTag) {//寫入行政區下的地點
                    choose_places.innerHTML += `<option>${data.地點}</option>`
                    placesTag = data.地點//判斷地點否寫入過
                }
                areaTag = data.行政區
            } else {
                if (data.地點 != placesTag) {//如果列表已經有重複行政區就直接寫地點
                    choose_places.innerHTML += `<option>${data.地點}</option>`
                    placesTag = data.地點
                }
            }
        })
    })

for (let i = 1; i < 13; i++) {//生成月份
    choose_mouth.innerHTML += `<option>${i}月</option>`
}

fetch('./json/flower_data.json')
    .then(function (respomse) {
        return respomse.json()
    }).then(function (flowers) {
        console.log(flowers);
        flowers.forEach(function (flower) {
            choose_flower.innerHTML += `<option>${flower.flower_name}</option>`//生成花列表
        })

        choose_places.addEventListener('change', function () {//當用戶選擇地點
            flower_icon.innerHTML = ''//清空icon
            choose_flower.selectedIndex = '0'//將花朵列表選項變為第一列
            flowers.forEach(function (flower) {
                if (choose_places.value == '請選擇地點') {//假如沒有選擇地點
                    if (flower.flowering.includes(choose_mouth.value)) {//依照選擇的月份生成icon
                        flower_icon.innerHTML += `<img src="${flower.flower_icon}" alt="${flower.flower_name}" onclick="check(this)">`
                    }
                }
                else if (choose_mouth.value == '請選擇月份') {//假如沒有選擇月份
                    if (flower.flower_place.includes(choose_places.value.trim())) {//依照選擇地點生成icon
                        flower_icon.innerHTML += `<img src="${flower.flower_icon}" alt="${flower.flower_name}" onclick="check(this)">`
                    }
                } else {//例外{選擇了月分與地點}
                    if (flower.flower_place.includes(choose_places.value.trim()) && flower.flowering.includes(choose_mouth.value)) {//生成的icon需同時包含選擇的地點與月份
                        flower_icon.innerHTML += `<img src="${flower.flower_icon}" alt="${flower.flower_name}" onclick="check(this)">`

                    }
                }
            })
        })

        choose_mouth.addEventListener('change', function () {//月份同上
            flower_icon.innerHTML = ''
            choose_flower.selectedIndex = '0'
            flowers.forEach(function (flower) {
                if (choose_mouth.value == '請選擇月份') {
                    if (flower.flower_place.includes(choose_places.value.trim())) {
                        flower_icon.innerHTML += `<img src="${flower.flower_icon}" alt="${flower.flower_name}" onclick="check(this)">`
                    }
                }
                else if (choose_places.value == '請選擇地點') {
                    if (flower.flowering.includes(choose_mouth.value)) {
                        flower_icon.innerHTML += `<img src="${flower.flower_icon}" alt="${flower.flower_name}" onclick="check(this)">`
                    }
                } else {
                    if (flower.flower_place.includes(choose_places.value.trim()) && flower.flowering.includes(choose_mouth.value)) {
                        flower_icon.innerHTML += `<img src="${flower.flower_icon}" alt="${flower.flower_name}" onclick="check(this)">`
                    }
                }
            })
        })

        choose_flower.addEventListener('change', function () {//選擇花朵最大  選甚麼就列哪種icon
            flower_icon.innerHTML = ''
            choose_mouth.selectedIndex = '0'
            choose_places.selectedIndex = '0'
            flowers.forEach(function (flower) {
                if (flower.flower_name == choose_flower.value) {

                    flower_icon.innerHTML += `<img src="${flower.flower_icon}" alt="${flower.flower_name}" onclick="check(this)">`
                } else if (choose_flower.value == '全部') {
                    flower_icon.innerHTML += `<img src="${flower.flower_icon}" alt="${flower.flower_name}" onclick="check(this)">`
                }
            })

        })
    })

fetch('./json/flower_data.json')//進網站就將所有花資料生成好並隱藏
    .then(function (respomse) {
        return respomse.json()
    }).then(function (flowers) {
        flowers.forEach(function (flower) {

            flower_box.innerHTML += `
                    <div class="none information" data-name="${flower.flower_name}">
                        <div class="flower-image">
                            <img src="${flower.flower_img}" alt="${flower.flower_name}">
                        </div>
                        <div class="flower-news">
                            <h3>${flower.flower_name}</h3>
                            <div class="news">
                                <p>花語 | </p>
                                <span>${flower.flower_language}</span>
                            </div>
                            <div class="news">
                                <p>花期 | </p>
                                <span>${flower.flowering.join('、')}</span>
                            </div>
                            <div class="news">
                                <p>地點 | </p>
                                <span>${flower.flower_place.join('、')}</span>
                            </div>
                        </div>
                        <div class="flower-introduce">
                            <p>${flower.flower_introduce}</p>
                        </div>
                    </div>
                    `
        })
    })


function check(Flower) {//點擊icon將對應資料顯示
    const informations = document.querySelectorAll('.information')
    informations.forEach(function (information) {
        if (Flower.alt == information.dataset.name) {
            information.classList.remove('none')
        } else {
            information.classList.add('none')

        }

    })
}