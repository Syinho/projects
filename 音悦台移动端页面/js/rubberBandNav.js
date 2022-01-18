/*
 * @Author: donglei
 * @Date: 2021-10-14 17:14:02
 * @LastEditors: donglei
 * @LastEditTime: 2021-11-21 21:36:02
 * @Description: file content
 * @FilePath: \projects\音悦台移动端页面\js\rubberBandNav.js
 */

/* 
    <div id="container">
    <ul id="wrapper">
        <li></li>
        <li></li>
        <li></li>
    </ul>
    </div>


    new RubberBandNav(selector)
*/


;
(function (w) {
    function RubberBandNav(container) {
        // 获取元素
        let oContainer = (typeof container === 'object') ? container : document.querySelector(container)
        let oWrapper = oContainer.querySelector('.wrapper')
        let aLi = oWrapper.querySelectorAll('li')
        // 数值变量
        let minDis;
        let maxDis = 0

        // 初始化owrapper的宽度
        oContainer.init = function () {
            let w = 0
            aLi.forEach((item, index) => {
                w += item.offsetWidth
            })
            oWrapper.style.width = w + 'px'
            minDis = oContainer.offsetWidth - oWrapper.offsetWidth
        }
        oContainer.init()

        // 点击开始事件
        oContainer.addEventListener('touchstart', function (e) {
            // 取消已经存在的动画
            if (oWrapper.translateX && oWrapper.translateX.timer) {
                clearInterval(oWrapper.translateX.timer)
                oWrapper.translateX.timer = null
            }
            // 获取点击的位置
            this.startX = e.targetTouches[0].clientX
            // 获取当前的oWrapper的偏移量
            this.startLeft = transformCSS(oWrapper, 'translateX')
            // 获取当前的点击时间
            this.startTime = Date.now()
        }, false)

        // 触点移动事件
        oContainer.addEventListener('touchmove', function (e) {
            // 获取当前触点的位置
            let curX = e.targetTouches[0].clientX
            // 计算当前的偏移量
            let curLeft = curX - this.startX + this.startLeft
            // 另声明一个变量用于设定最终的偏移量
            let dis = curLeft
            // 边界判断
            if (curLeft <= minDis) {
                dis = curLeft - (curLeft - minDis) / 2
            } else if (curLeft >= maxDis) {
                dis = curLeft - (curLeft - maxDis) / 2
            }
            // 添加内联样式
            transformCSS(oWrapper, 'translateX', dis)
        }, false)

        // 触点移除事件
        oContainer.addEventListener('touchend', function (e) {
            // 逻辑：
            // 1. 首先判断当前的偏移量是否大于最大值或小于最小值
            // 1.1 若大于最大值或小于最小值，那么调用Back.easeOut 使之回到边界位置
            // 2. 若在区间之内，调用惯性移动，首先判断加上惯性移动距离后是否超过边界
            // 2.1 超过边界，惯性移动距离只允许到边界
            // 2.2 不超过边界，惯性移动距离120ms的距离

            // 获取当前触点位置
            let endX = e.changedTouches[0].clientX
            // 获取当前的偏移量
            let endLeft = transformCSS(oWrapper, 'translateX')
            // 获取当前的时间
            let endTime = Date.now()
            // 判断当前位置是否超过最大值与最小值
            if (endLeft <= minDis) {
                tweenAnimation(oWrapper, 'translateX', endLeft, (minDis - endLeft), 500, 'Back.easeOut')
                return
            } else if (endLeft >= maxDis) {
                tweenAnimation(oWrapper, 'translateX', endLeft, (maxDis - endLeft), 500, 'Back.easeOut')
                return
            }
            // 修改为使用tweenAnimation动画
            // 增加惯性移动
            InertialMobile.call(this)



            function InertialMobile() {
                // 惯性移动，只有在当前偏移量没有超过边界时才调用
                // 如果触点向左滑动，v为负数；如果触点向右滑动，v为正数
                let v = (endX - this.startX) / (endTime - this.startTime)
                // 向左滑动得到负值，向右滑动得到正值
                let s = v * 120
                let dis = endLeft + s
                if (dis <= minDis) {
                    s = minDis - endLeft
                } else if (dis >= maxDis) {
                    s = maxDis - endLeft
                }
                // tween动画移动
                tweenAnimation(oWrapper, 'translateX', endLeft, s, 500, 'Cubic.easeOut')
            }

        }, false)
    }
    w.RubberBandNav = RubberBandNav
})(window)