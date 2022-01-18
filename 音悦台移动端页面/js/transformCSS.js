/*
 * @Author: donglei
 * @Date: 2021-10-14 17:56:15
 * @LastEditors: donglei
 * @LastEditTime: 2021-10-15 07:47:40
 * @Description: file content
 * @FilePath: \TEST\10.14\test2.js
 */

;
(function (w) {
    function transformCSS(el, style, value) {
        // 初始化参数
        el = (typeof el === 'object') ? el : document.querySelector(el)
        // 值应该保存在对象中
        if (!el.store) {
            el.store = {}
        }
        // 判断传入参数个数
        if (arguments.length == 2) {
            // 获取属性值
            if (el.store[style]) {
                return el.store[style]
            } else {
                return 0
            }

        } else if (arguments.length === 3) {
            // 设置属性值
            el.store[style] = value
            el.htmlStr = ''
            // 将更新后的store对象重新添加到内联样式中
            for (const prop in el.store) {
                let unit = judgeUnit(prop)
                el.htmlStr += `${prop}(${el.store[prop]}${unit})`
            }
            el.style.transform = el.htmlStr
        }

        function judgeUnit(prop) {
            switch (prop) {
                case 'translate':
                case 'translateX':
                case 'translateY':
                case 'translateZ':
                    return 'px'
                    break
                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                case 'rotateZ':
                    return 'deg'
                    break
                case 'scale':
                case 'scaleX':
                case 'scaleY':
                case 'scaleZ':
                    return ''
                    break
            }
        }
    }
    w.transformCSS = transformCSS
})(window)