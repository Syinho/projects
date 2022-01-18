/*
 * @Author: donglei
 * @Date: 2021-10-18 14:09:05
 * @LastEditors: donglei
 * @LastEditTime: 2021-10-31 11:33:40
 * @Description: file content
 * @FilePath: \projects\音悦台移动端页面\js\swiper.js
 */




/* 
    示例html结构
    <div class="swiper-container">
        <ul class="swiper-wrapper">
            <li class="swiper-slide">
                li元素内部可能有很多元素，不一定只有img，
                li元素的宽度根据内部元素的宽度，用js进行计算
            </li>
            <li class="swiper-slide"></li>
            <li class="swiper-slide"></li>
            <li class="swiper-slide"></li>
            <li class="swiper-slide"></li>
        </ul>
        <!-- 导航点根据构造函数传参决定 -->
        <ul class="swiper-pagination"> 
            ul不需要构建，只是用作示例
            li元素由js根据swiper-slide的个数来写
        </ul>
    </div>

    示例js
    new Swiper('.swiper-container',{
        loop:false, // 是否无缝滚动，默认为false
        auto:false, // 是否自动滚动，默认为false
        pagination:false, // 是否添加导航点，默认为false
        switchTime:5000, // 切换时间，默认3000ms
        callback:{
            start:function(){},
            move:function(){},
            end:fucntion(){}
        }
    })
*/

;
(function (w) {
    function Swiper(selector, options) {
        let oContainer = null
        if (typeof selector === 'object') {
            oContainer = selector
        } else if (typeof selector === 'string') {
            oContainer = document.querySelector(selector)
        }
        let auto = options ? options.auto : false
        let loop = options ? options.loop : false
        let pagination = options ? options.pagination || false : false
        let switchTime = options ? options.switchTime || 3000 : 3000
        let callback = options ? options.callback || null : null

        // 获取html结构
        let oWrapper = oContainer.querySelector('.swiper-wrapper')
        let aSlide = null
        let len = oWrapper.querySelectorAll('.swiper-slide').length
        let length = 0
        let oNav = null
        let aLiNav = null

        if (loop) {
            oWrapper.innerHTML += oWrapper.innerHTML
        }
        aSlide = oWrapper.querySelectorAll('.swiper-slide')
        length = aSlide.length
        if (pagination) {
            let oUl = document.createElement('ul')
            oUl.classList.add('swiper-pagination')
            oNav = oUl
            oContainer.appendChild(oUl)
            for (let i = 0; i < len; i++) {
                let oLi = document.createElement('li')
                if (i === 0) {
                    oLi.classList.add('active')
                }
                oUl.appendChild(oLi)
            }
            aLiNav = oNav.querySelectorAll('li')
        }

        // 状态变量
        let isFirst = true
        let isHori = true
        let iNow = 0

        // 初始化
        oContainer.init = function () {
            oWrapper.style.width = length * 100 + '%'
            aSlide.forEach((item, index, arr) => {
                item.style.width = 1 / length * 100 + '%'
            })
            if (callback && typeof callback.init === 'function') {
                callback.init()
            }
        }
        oContainer.init()

        // 触点开始
        let index = 0
        oContainer.addEventListener('touchstart', function (e) {
            // 获取初始触点位置
            index++
            this.startX = e.targetTouches[0].clientX
            this.statrY = e.targetTouches[0].clientY
            // 获取初始时间
            this.startTime = Date.now()
            // 清除定时器
            clearInterval(this.timer)
            this.timer = null
            // 清除transition
            oWrapper.style.transition = 'none'
            // 检查当前页面
            if (loop) {
                if (iNow === 0) {
                    iNow = len
                    transformCSS(oWrapper, 'translateX', -iNow * oContainer.offsetWidth)
                } else if (iNow === length - 1) {
                    iNow = len - 1
                    transformCSS(oWrapper, 'translateX', -iNow * oContainer.offsetWidth)
                }
            }
            // 获取初始偏移量
            this.startLeft = transformCSS(oWrapper, 'translateX')

            if (callback && typeof callback.start === 'function') {
                callback.start()
            }
        }, false)

        // 触点移动
        oContainer.addEventListener('touchmove', function (e) {
            // 获取当前的触点位置
            let curX = e.targetTouches[0].clientX
            let curY = e.targetTouches[0].clientY
            let disX = Math.abs(curX - this.startX)
            let disY = Math.abs(curY - this.statrY)
            // 对当前的方向进行判断,且只判断一次
            if (isFirst) {
                isFirst = false
                if (disX > disY) {
                    isHori = true
                } else {
                    isHori = false
                }
            }

            if (!isHori) return
            if (isHori) {
                e.preventDefault();
                e.stopPropagation()
            }

            // 计算当前应该的偏移位置
            let dis = curX - this.startX + this.startLeft
            // 修改wrapper的translate属性值
            transformCSS(oWrapper, 'translateX', dis)
            // 阻止冒泡,因为在它的外层元素上很可能有touchmove事件监听
            if (callback && typeof callback.move === 'function') {
                callback.move()
            }
        }, false)

        // 失去触点
        oContainer.addEventListener('touchend', function (e) {
            isFirst = true
            if (!isHori) return
            // 计算iNow
            let endX = e.changedTouches[0].clientX
            let endTime = Date.now()
            let disX = endX - this.startX
            let disTime = endTime - this.startTime
            if (Math.abs(disX) >= oContainer.offsetWidth * 0.5 || disTime <= 200) {
                if (disX > 0) {
                    // 触点向右移动
                    iNow--
                } else if (disX < 0) {
                    // 触点向左移动
                    iNow++
                } else if (disX === 0) {
                    console.log('you touch too quickly')
                }
            }
            oContainer.toMove(iNow)
            if (auto) oContainer.auto()
        }, false)

        oContainer.toMove = function (i) {
            if (i < 0) {
                iNow = 0
            } else if (i > length - 1) {
                iNow = length - 1
            }
            console.log(iNow)
            oWrapper.style.transition = 'all .5s'
            transformCSS(oWrapper, 'translateX', -iNow * oContainer.offsetWidth)
            if (pagination) {
                let index = iNow % len
                aLiNav.forEach((item, index, arr) => {
                    item.classList.remove('active')
                })
                aLiNav[index].classList.add('active')
            }
            if (callback && typeof callback.end === 'function') {
                callback.end()
            }
        }



        oContainer.auto = function () {
            if (!auto) return
            if (this.timer) return
            this.timer = setInterval(() => {
                iNow++
                oContainer.toMove(iNow)
            }, switchTime);
        }
        if (auto) oContainer.auto()

        if (loop) {
            oWrapper.addEventListener('transitionend', function (e) {
                if (iNow === length - 1) {
                    iNow = len - 1
                    oWrapper.style.transition = 'none'
                    transformCSS(oWrapper, 'translateX', -iNow * oContainer.offsetWidth)
                }
            }, false)
        }
        oContainer.setInow = function (i) {
            iNow = i
        }
        this.node = oContainer
        this.getIndex = function () {
            return iNow
        }

    }
    w.Swiper = Swiper
})(window)