/*
 * @Author: donglei
 * @Date: 2021-10-13 21:06:03
 * @LastEditors: donglei
 * @LastEditTime: 2021-11-23 18:24:46
 * @Description: file content
 * @FilePath: \projects\音悦台移动端页面\js\app.js
 */



// 获取元素
let oApp = document.querySelector('#app')
let oHeaderMain = document.querySelector('#headerMain')
let oContainer = document.querySelector('#container')


// 状态变量

// 初始化
;
(function () {
    // 取消默认行为
    app.addEventListener('touchstart', function (e) {
        // e.preventDefault()
        if (e.target.tagName === 'A') {
            e.preventDefault()
        }
    }, false)

    // 设定html的font-size
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px'
    // 所有的a标签都取消掉默认行为
})()


// 头部区
;
(function () {
    // 获取元素
    let oMenuBtn = oHeaderMain.querySelector('.menu-btn')
    let oHeaderHiddenMenu = oHeaderMain.querySelector('#headerHiddenMenu')
    // 监听事件
    oMenuBtn.addEventListener('touchstart', function (e) {
        if (oMenuBtn.classList.contains('hidden')) {
            oMenuBtn.classList.remove('hidden')
            oMenuBtn.classList.add('show')
            oHeaderHiddenMenu.style.display = 'block'
        } else {
            oMenuBtn.classList.remove('show')
            oMenuBtn.classList.add('hidden')
            oHeaderHiddenMenu.style.display = 'none'
        }
    }, false)
})()

// 横向弹簧导航
;
(function () {
    // 获取元素
    let oBrandNavContainer = oContainer.querySelector('#brandNavContainer')
    let oBrandNavWrapper = oBrandNavContainer.querySelector('.wrapper')
    let aLi = oBrandNavWrapper.querySelectorAll('li')
    let isMove = false
    // 创建移动条实例对象
    new RubberBandNav(oBrandNavContainer)
    // 取消owrapper内的a元素的默认行为
    oBrandNavWrapper.addEventListener('touchstart', function (e) {
        // if (e.target.tagName === 'A') {
        //     e.preventDefault()
        // }
    }, false)
    // 点击时做判断，如果有移动，就不更改.active，如果无移动，更改
    oBrandNavWrapper.addEventListener('touchmove', function (e) {
        isMove = true
    }, false)
    oBrandNavWrapper.addEventListener('touchend', function (e) {
        if (!isMove) {
            aLi.forEach((item, index, arr) => {
                item.classList.remove('active')
            })
            if (e.target.tagName === 'A') {
                e.target.parentNode.classList.add('active')
            }
        } else {
            isMove = false
            return
        }
    }, false)
})()

// 轮播图区
;
(function () {
    new Swiper('#swiperFirst', {
        auto: true,
        loop: true,
        pagination: true,
        switchTime: 3000
    })
})()

// 标签页
;
(function () {
    let oTabs = document.querySelector('#tabs')
    // let oFirstTab = oTabs.querySelector('#firstTab')
    let aFloor = oTabs.querySelectorAll('.floor')
    for (let i = 0; i < aFloor.length; i++) {
        let oNav = aFloor[i].querySelector('nav')
        let aLiNav = oNav.querySelectorAll('.item')
        let oBotMove = oNav.querySelector('.bottom-move')
        let oContainer = aFloor[i].querySelector('.swiper-container')
        let oWrapper = oContainer.querySelector('.swiper-wrapper')
        let aSlide = oWrapper.querySelectorAll('.swiper-slide')


        let isMove = false
        let obj = new Swiper(oContainer, {
            auto: false,
            loop: false,
            pagination: false,
            callback: {
                end: function () {
                    let index = obj.getIndex()
                    transformCSS(oBotMove, 'translateX', index * aLiNav[0].offsetWidth)
                    setTimeout(() => {
                        let oSlide = aSlide[index]
                        if (oSlide.children.length === 1) {
                            let htmlStr = aSlide[0].innerHTML
                            oSlide.innerHTML = htmlStr
                        }
                    }, 2000);

                    // setTimeout(() => {
                    //     let oFirstSwiperSlide = aFloor[i].querySelector('.swiper-slide')
                    //     let oSlide = aSlide[index]
                    //     if (oSlide.children.length === 1) {
                    //         let url = ""
                    //         let oCloneSlide = oFirstSwiperSlide.cloneNode(true)
                    //         $.get(url, function (data) {
                    //             for (let i = 0; i < data.song_list.length; i++) {
                    //                 let oImg = oCloneSlide.querySelectorAll('img')[i]
                    //                 oImg.src = data.song_list[i]
                    //                 let oTitle = oCloneSlide.querySelectorAll('.content-header')[i]
                    //                 oTitle.innerText = data.song_list[i].title
                    //                 oWrapper.replaceChild(oCloneSlide, oSlide)
                    //             }
                    //         }, 'json')
                    //     }
                    // }, 2000);
                }
            }
        })
        aLiNav.forEach((item, index, arr) => {
            item.index = index
        })
        oNav.addEventListener('touchmove', function (e) {
            isMove = true
            e.stopPropagation()
        }, false)
        oNav.addEventListener('touchend', function (e) {
            if (!isMove) {
                if (e.target.nodeName === 'DIV') {
                    let index = e.target.index
                    transformCSS(oBotMove, 'translateX', index * aLiNav[0].offsetWidth)
                    obj.node.setInow(index)
                    obj.node.toMove(index)
                }
            }
            isMove = false
            e.stopPropagation()
        }, false)
    }
})()

// 楼层滚动
;
(function () {
    new TouchScroll(oApp, oContainer)
})()