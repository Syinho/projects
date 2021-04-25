window.onload = function () {
    let oLoading = $('loading');
    let oHeader = $('header');
    let oMuisc = $('music');
    let oAudio = $('audio1');
    let oNav = $('nav');
    let aLiNav = oNav.getElementsByTagName('li');
    let oArrow = $('arrow');
    let oContent = $('content');
    let oList = $('list');
    let oMenu = document.getElementById('menu')
    let aLiMenu = oMenu.getElementsByTagName('li');
    let aLiList = getByClass(oList, 'liList');
    let aDivList = getByClass(oList, 'divList');
    let oHomeContent = $('homeContent');
    let oHomeContent1 = getByClass(oHomeContent, 'homeContent1')[0];
    let oHomeContent2 = getByClass(oHomeContent, 'homeContent2')[0];
    let oCourseContent = $('courseContent');
    let oCourseContent3 = getByClass(oCourseContent, 'courseContent3')[0];
    let oWorks = $('works');
    let oWorksContent = $('worksContent');
    let oWorksContent2 = getByClass(oWorksContent, 'worksContent2')[0];
    let oAboutContent = $('aboutContent');
    let oAboutContent3 = getByClass(oAboutContent, 'aboutContent3')[0];
    let oPartnerContent = $('partnerContent');
    let oPartnerContent3 = getByClass(oPartnerContent, 'partnerContent3')[0];


    let iContentHeight = 0;
    let nowIdx = 0;
    let prevIdx = 0;
    let resizeTimer = null;

    showLoading();
    contentAuto();
    listContentAuto();
    bindNav();
    mousewheel();
    worksContent();
    homeContent();
    courseContent();
    aboutContent();
    partnerContent();
    showMusic();


    window.onresize = fnResize;

    function showLoading() {
        let oSpan = oLoading.getElementsByTagName('span')[0];
        let aDiv = oLoading.getElementsByTagName('div'); {
            let arr = ['20190214100918.jpg', 'about1.jpg', 'about2.jpg', 'about3.jpg', 'about4.jpg', 'bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'blizzard.png', 'capcom.png', 'ea.png', 'greenLine.png', 'home.png', 'home1.jpg', 'home2.jpg', 'home3.jpg', 'home4.jpg', 'home_gruen.png', 'logo.png', 'menuIndicator.png', 'microsoft.png', 'musicoff.gif', 'musicon.gif', 'nintendo.png', 'pencel1.png', 'pencel2.png', 'pencel3.png', 'plane1.png', 'plane2.png', 'plane3.png', 'plus_row.png', 'ps4.png', 'robot.png', 'shanda.png', 'sony.png', 'steam.png', 'team.png', 'tencent.png', 'ubisoft.png', 'worksimg1.jpg', 'worksimg2.jpg', 'worksimg3.jpg', 'worksimg4.jpg', 'xbox.png', 'zoomico.png'];
            let count = 0;
            for (let i = 0; i < arr.length; i++) {
                let imgEle = new Image();
                imgEle.src = 'img/' + arr[i];
                imgEle.onload = function () {
                    count++;
                    oSpan.style.width = count / arr.length * 100 + '%';
                }
                imgEle.onerror = function () {
                    console.log('' + imgEle.src);
                }
            }
        }

        function spanChange() {
            if (oSpan.style.width == '100%') {
                oSpan.style.display = 'none';
                aDiv[0].style.height = aDiv[1].style.height = 0;
            }
        }

        function divChange() {
            oLoading.parentNode.removeChild(oLoading);
            cjAnimate[0].inAn();
        }


        oSpan.addEventListener('transitionend', spanChange, false);
        aDiv[0].addEventListener('transitionend', divChange, false);
    }

    function contentAuto() {
        iContentHeight = viewHeight() - oHeader.offsetHeight;
        oContent.style.height = iContentHeight + 'px';
        oList.style.top = -nowIdx * iContentHeight + 'px';
        for (let i = 0; i < aLiList.length; i++) {
            aLiList[i].style.height = iContentHeight + 'px';
        }
    }

    function listContentAuto() {
        let mt = (iContentHeight - 520) / 2;
        for (let i = 0; i < aDivList.length; i++) {
            aDivList[i].style.marginTop = mt + 'px';
        }
    }

    function fnResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            console.log('调用fnresize');
            contentAuto();
            listContentAuto();
            if (getByClass(oWorks, 'showImgParent').length != 0) {
                let sIP = getByClass(oWorks, 'showImgParent')[0];
                console.log(sIP);
                sIP.style.width = viewWidth() + 'px';
                sIP.style.height = viewHeight() - oHeader.offsetHeight + 'px';
            }
        }, 200);
    }

    function bindNav() {
        aLiMenu[0].className = 'active';
        const oUp = aLiNav[0].getElementsByTagName('div')[0];
        oUp.style.width = '100%';
        oList.style.top = -nowIdx * iContentHeight + 'px';
        oArrow.style.left = aLiNav[0].offsetLeft + aLiNav[0].offsetWidth / 2 - oArrow.offsetWidth / 2 + 'px';
        for (let i = 0; i < aLiMenu.length; i++) {
            aLiMenu[i].index = i;
            aLiMenu[i].onclick = function () {
                prevIdx = nowIdx;
                nowIdx = this.index;
                toMove(this.index);
            }
        }
        for (let i = 0; i < aLiNav.length; i++) {
            aLiNav[i].index = i;
            aLiNav[i].onmousedown = function () {
                prevIdx = nowIdx;
                nowIdx = this.index;
                toMove(this.index);
            }
        }
    }

    function toMove(i) {
        for (let i = 0; i < aLiMenu.length; i++) {
            aLiMenu[i].className = '';
        }
        aLiMenu[i].className = 'active';
        for (let i = 0; i < aLiNav.length; i++) {
            aLiNav[i].getElementsByTagName('div')[0].style.width = '';
        }
        aLiNav[i].getElementsByTagName('div')[0].style.width = '100%';
        oArrow.style.left = aLiNav[i].offsetLeft + aLiNav[i].offsetWidth / 2 - oArrow.offsetWidth / 2 + 'px';
        oList.style.top = -nowIdx * iContentHeight + 'px';
        if (cjAnimate[i]) {
            console.log(`cjAnimate${i}存在`);

            if (cjAnimate[i].inAn) {
                cjAnimate[i].inAn();
            }
        }
        if (cjAnimate[prevIdx]) {
            if (cjAnimate[prevIdx].outAn) {
                cjAnimate[prevIdx].outAn();
            }
        }
    }

    function mousewheel() {
        let uod;
        let timer = null;
        if (!+'\v1') {
            // IE9以下使用 attachEvent ,通过window.event来获取事件
            oContent.attachEvent('mousewheel', function () {
                let e = window.event;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    toChange(e);
                }, 200);
            })
        } else {
            oContent.addEventListener('mousewheel', function (ev) {
                let e = ev;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    toChange(e);
                }, 200);
            }, false);
            oContent.addEventListener('DOMMouseScroll', function (ev) {
                let e = ev;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    toChange(e);
                }, 200);
            }, false);
        }

        function toChange(e) {
            if (e.wheelDelta) {
                uod = e.wheelDelta > 0 ? 'up' : 'down';
            } else if (e.detail) {
                uod = e.detail < 0 ? 'up' : 'down';
            }

            if (uod == 'up') {
                if (nowIdx != 0) {
                    prevIdx = nowIdx;
                    nowIdx--;
                    toMove(nowIdx);
                } else {
                    return;
                }
            } else if (uod == 'down') {
                if (nowIdx != aLiList.length - 1) {
                    prevIdx = nowIdx;
                    nowIdx++;
                    toMove(nowIdx);
                } else {
                    return;
                }
            }

            if (e.preventDefault) {
                e.preventDefault();
            } else {
                return false;
            }
        }
    }

    function homeContent() {
        let aLi1 = oHomeContent1.getElementsByTagName('li');
        let aLi2 = oHomeContent2.getElementsByTagName('li');
        let nowPage = 0;
        let prevPage = 0;
        let data = [{
            text: 'Lorem, ipsum dolor.'
        }, {
            text: 'Lorem, ipsum dolor.'
        }, {
            text: 'Lorem, ipsum dolor.'
        }, {
            text: 'Lorem, ipsum dolor.'
        }]
        create();

        function create() {
            for (let i = 0; i < data.length; i++) {
                let oLi1 = document.createElement('li');
                oLi1.innerHTML = `<h1 class="commonTitle">${data[i].text}</h1>`;
                let oLi2 = document.createElement('li');
                if (i == 0) {
                    oLi1.className = oLi2.className = 'active';
                }
                oHomeContent1.appendChild(oLi1);
                oHomeContent2.appendChild(oLi2);
            }
        }
        manualAnimate();

        function manualAnimate() {
            for (let i = 0; i < aLi2.length; i++) {
                aLi2[i].index = i;
                aLi2[i].onclick = function () {
                    for (let i = 0; i < aLi2.length; i++) {
                        aLi2[i].className = '';
                    }
                    aLi2[this.index].className = 'active';

                    if (nowPage < this.index) {
                        aLi1[nowPage].className = 'leftHide';
                        aLi1[this.index].className = 'rightShow';
                    } else if (nowPage > this.index) {
                        aLi1[nowPage].className = 'rightHide';
                        aLi1[this.index].className = 'leftShow';
                    }
                    prevPage = nowPage;
                    nowPage = this.index;
                }
            }
        }


        autoAnimate();

        function autoAnimate() {
            let timer = setInterval(change, 3000);
            oHomeContent.addEventListener('mouseover', function () {
                clearInterval(timer);
            }, false);

            function change() {
                if (nowPage != aLi1.length - 1) {
                    prevPage = nowPage;
                    nowPage++;
                } else {
                    prevPage = nowPage;
                    nowPage = 0;
                }
                for (let i = 0; i < aLi2.length; i++) {
                    aLi2[i].className = '';
                }
                aLi2[nowPage].className = 'active';
                aLi1[prevPage].className = 'leftHide';
                aLi1[nowPage].className = 'rightShow';
            }
        }
    }

    function courseContent() {
        let data = [{
            img: 'img/tencent.png',
            text: 'Tecent WeGame are looking forward to your joining'
        }, {
            img: 'img/tencent.png',
            text: 'Tecent WeGame are looking forward to your joining'
        }, {
            img: 'img/tencent.png',
            text: 'Tecent WeGame are looking forward to your joining'
        }, {
            img: 'img/tencent.png',
            text: 'Tecent WeGame are looking forward to your joining'
        }, {
            img: 'img/tencent.png',
            text: 'Tecent WeGame are looking forward to your joining'
        }, {
            img: 'img/tencent.png',
            text: 'Tecent WeGame are looking forward to your joining'
        }, {
            img: 'img/tencent.png',
            text: 'Tecent WeGame are looking forward to your joining'
        }, {
            img: 'img/tencent.png',
            text: 'Tecent WeGame are looking forward to your joining'
        }, {
            img: 'img/tencent.png',
            text: 'Tecent WeGame are looking forward to your joining'
        }, {
            img: 'img/tencent.png',
            text: 'Tecent WeGame are looking forward to your joining'
        }, {
            img: 'img/tencent.png',
            text: 'Tecent WeGame are looking forward to your joining'
        }, {
            img: 'img/tencent.png',
            text: 'Tecent WeGame are looking forward to your joining'
        }];

        create();

        function create() {
            for (let i = 0; i < data.length; i++) {
                let oDiv = document.createElement('div');
                oDiv.className = 'courseLogo';
                oDiv.innerHTML = `<div class="courseBefore" style="background-image:url('${data[i].img}');"></div><div class="courseAfter">${data[i].text}</div>`;
                oCourseContent3.appendChild(oDiv);
            }
        }
    }

    function worksContent() {

        let data = [{
            img: 'img/worksimg1.jpg',
            text: 'new journey'
        }, {
            img: 'img/worksimg2.jpg',
            text: 'new boss'
        }, {
            img: 'img/worksimg3.jpg',
            text: 'new map'
        }, {
            img: 'img/worksimg4.jpg',
            text: 'new scenario'
        }];

        for (let i = 0; i < data.length; i++) {
            let oDivParent = document.createElement('div');
            oDivParent.className = 'worksImgParent';
            oDivParent.innerHTML = `<div class="worksImgMask"><span>${data[i].text}</span><div data-idx="${i}"></div></div><img class="worksImg" src="${data[i].img}">`;
            oWorksContent2.appendChild(oDivParent);
        }
        showImg();

        function showImg() {
            let aImgMask = getByClass(oWorksContent2, 'worksImgMask');
            for (let i = 0; i < aImgMask.length; i++) {
                let oDiv = aImgMask[i].getElementsByTagName('div')[0];
                oDiv.addEventListener('click', show, false);

                function show(e) {
                    let target = e.target;
                    let idx = target.dataset.idx;
                    let oDiv = document.createElement('div');
                    oDiv.className = 'showImgParent';
                    oDiv.innerHTML = `<img src="${data[idx].img}" class="showImg"><div class="cancelBtn"><div></div><div></div></div>`
                    oWorks.appendChild(oDiv);
                    let oBtn = getByClass(oDiv, 'cancelBtn')[0];
                    oBtn.addEventListener('click', (e) => {
                        e.target.style.display = 'none';
                        oDiv.style.width = 0;
                        oDiv.style.height = 0;
                        oDiv.style.opacity = 0;
                        setTimeout(() => {
                            oWorks.removeChild(oDiv);
                        }, 2000);
                    }, false);
                    setTimeout(() => {
                        oDiv.style.width = viewWidth() + 'px';
                        oDiv.style.height = viewHeight() - oHeader.offsetHeight + 'px';
                        oDiv.style.opacity = 1;
                    }, 50);
                }
            }
        }
    }

    function aboutContent() {
        let aUl = oAboutContent3.getElementsByTagName('ul');
        let aSpan = oAboutContent3.getElementsByTagName('span');

        for (let i = 0; i < aUl.length; i++) {
            change(aUl[i], aSpan[i]);
        }

        function change(ul, span) {
            let w = ul.offsetWidth / 2;
            let h = ul.offsetHeight / 2;
            let src = ul.dataset.src;

            for (let i = 0; i < 4; i++) {
                let oLi = document.createElement('li');
                oLi.style.width = w + 'px';
                oLi.style.height = h + 'px';
                ul.appendChild(oLi);
                let oImg = document.createElement('img');
                oImg.src = src;
                oImg.style.left = -i % 2 * w + 'px';
                oImg.style.top = -Math.floor(i / 2) * h + 'px';
                oImg.oldleft = -i % 2 * w;
                oImg.oldtop = -Math.floor(i / 2) * h;
                oLi.appendChild(oImg);
            }

            let data = [{
                name: 'top',
                value: h
            }, {
                name: 'left',
                value: -2 * w
            }, {
                name: 'left',
                value: w
            }, {
                name: 'top',
                value: -2 * h
            }];

            let aImg = ul.getElementsByTagName('img');

            ul.onmouseover = function () {
                for (let i = 0; i < aImg.length; i++) {
                    aImg[i].style[data[i].name] = data[i].value + 'px';
                }
                setStyle(span, 'transform', 'scale(1)');
            };
            ul.onmouseout = function () {
                for (let i = 0; i < aImg.length; i++) {
                    aImg[i].style[data[i].name] = aImg[i]['old' + data[i].name] + 'px';
                }
                setStyle(span, 'transform', 'scale(1.5)');
            };
        }
    }

    function partnerContent() {
        let aLi = oPartnerContent3.getElementsByTagName('li');
        let w = 118;
        let h = 300;
        let cvs = null;
        let timer1 = null;
        let timer2 = null;
        create();
        bindList();

        function create() {
            let oUl = document.createElement('ul');

            for (let i = 0; i < 8; i++) {
                let oLi = document.createElement('li');
                oLi.style.backgroundPosition = -i * w + 'px 0';
                oUl.appendChild(oLi);
            }
            oPartnerContent3.appendChild(oUl);
        }

        function addCvs() {
            // 当鼠标移动到li元素上时，创建画布
            if (!cvs) {
                cvs = document.createElement('canvas');
                cvs.id = 'cvs';
                cvs.width = w;
                cvs.height = h;
                oPartnerContent3.appendChild(cvs);
                bindCvs();
            }
        }

        function bindCvs() {
            let ctx = cvs.getContext('2d');
            let setArr = [];
            timer1 = setInterval(function () {
                let x = Math.floor(Math.random() * w);
                let y = h - 10;
                setArr.push({
                    x: x,
                    y: y,
                    startX: x,
                    startY: y,
                    r: Math.floor(Math.random() * 10) + 2,
                    c1: Math.floor(Math.random() * 256),
                    c2: Math.floor(Math.random() * 256),
                    c3: Math.floor(Math.random() * 256),
                    c4: 1,
                    step: Math.floor(Math.random() * 20) + 10,
                    deg: 0
                })
            }, 100);

            timer2 = setInterval(function () {
                ctx.clearRect(0, 0, 400, 400);
                for (let i = 0; i < setArr.length; i++) {
                    let trg = setArr[i];
                    trg.deg += 5;
                    trg.x = trg.startX - Math.sin(trg.deg * Math.PI / 180) * trg.step;
                    trg.y = trg.startY - trg.deg * Math.PI / 180 * trg.step;
                    if (trg.y < 50) {
                        setArr.splice(i, 1);
                    }
                }

                for (let i = 0; i < setArr.length; i++) {
                    let trg = setArr[i];
                    ctx.fillStyle = `rgba(${trg.c1},${trg.c2},${trg.c3},${trg.c4})`;
                    ctx.beginPath();
                    ctx.moveTo(trg.x, trg.y);
                    ctx.arc(trg.x, trg.y, trg.r, 0, 2 * Math.PI, false);
                    ctx.closePath();
                    ctx.fill();
                }
            }, 1000 / 60);
        }

        function removeCvs() {
            if (cvs) {
                clearInterval(timer1);
                clearInterval(timer2);
                oPartnerContent3.removeChild(cvs);
                cvs = null;
            }
        }

        function bindList() {
            for (let i = 0; i < aLi.length; i++) {
                aLi[i].onmouseover = function (e) {
                    let oLi = e.target;
                    addCvs();
                    cvs.style.left = oLi.offsetLeft + 'px';
                    for (let i = 0; i < aLi.length; i++) {
                        aLi[i].style.opacity = '.5';
                    }
                    oLi.style.opacity = 1;
                }
            }

            oPartnerContent3.onmouseleave = function () {
                removeCvs();
                for (let i = 0; i < aLi.length; i++) {
                    aLi[i].style.opacity = 1;
                }
            }
        }
    }

    var cjAnimate = [{
        inAn: function () {
            oHomeContent1.style.opacity = 1;
            oHomeContent2.style.opacity = 1;
            setStyle(oHomeContent1, 'transform', 'translate(0,0)');
            setStyle(oHomeContent2, 'transform', 'translate(0,0)');
        },
        outAn: function () {
            oHomeContent1.style.opacity = 0;
            oHomeContent2.style.opacity = 0;
            setStyle(oHomeContent1, 'transform', 'translate(0,-150px)');
            setStyle(oHomeContent2, 'transform', 'translate(0,100px)');
        }
    }, {
        inAn: function () {
            const oPlane1 = getByClass(oCourseContent, 'plane1')[0];
            const oPlane2 = getByClass(oCourseContent, 'plane2')[0];
            const oPlane3 = getByClass(oCourseContent, 'plane3')[0];
            setStyle(oPlane1, 'transform', 'translate(0,0)');
            setStyle(oPlane2, 'transform', 'translate(0,0)');
            setStyle(oPlane3, 'transform', 'translate(0,0)');
        },
        outAn: function () {
            const oPlane1 = getByClass(oCourseContent, 'plane1')[0];
            const oPlane2 = getByClass(oCourseContent, 'plane2')[0];
            const oPlane3 = getByClass(oCourseContent, 'plane3')[0];
            setStyle(oPlane1, 'transform', 'translate(-200px,-200px)');
            setStyle(oPlane2, 'transform', 'translate(-200px,200px)');
            setStyle(oPlane3, 'transform', 'translate(200px,-200px)');
        }
    }, {
        inAn: function () {
            let oPencel1 = getByClass(oWorksContent, 'pencel1')[0];
            let oPencel2 = getByClass(oWorksContent, 'pencel2')[0];
            let oPencel3 = getByClass(oWorksContent, 'pencel3')[0];
            setStyle(oPencel1, 'transform', 'translate(0,0)');
            setStyle(oPencel2, 'transform', 'translate(0,0)');
            setStyle(oPencel3, 'transform', 'translate(0,0)');
        },
        outAn: function () {
            let oPencel1 = getByClass(oWorksContent, 'pencel1')[0];
            let oPencel2 = getByClass(oWorksContent, 'pencel2')[0];
            let oPencel3 = getByClass(oWorksContent, 'pencel3')[0];
            setStyle(oPencel1, 'transform', 'translate(0,-200px)');
            setStyle(oPencel2, 'transform', 'translate(0,200px)');
            setStyle(oPencel3, 'transform', 'translate(0,200px)');
        }
    }, {
        inAn: function () {
            let aAboutImg = getByClass(oAboutContent, 'aboutImg');
            setStyle(aAboutImg[0], 'transform', 'rotateZ(0)');
            setStyle(aAboutImg[1], 'transform', 'rotateZ(0)');
        },
        outAn: function () {
            let aAboutImg = getByClass(oAboutContent, 'aboutImg');
            setStyle(aAboutImg[0], 'transform', 'rotateZ(45deg)')
            setStyle(aAboutImg[1], 'transform', 'rotateZ(-45deg)');
        }
    }, {
        inAn: function () {
            let oPartnerContent1 = getByClass(oPartnerContent, 'partnerContent1')[0];
            let oPartnerContent2 = getByClass(oPartnerContent, 'partnerContent2')[0];
            oPartnerContent1.style.opacity = 1;
            oPartnerContent2.style.opacity = 1;
            setStyle(oPartnerContent1, 'transform', 'translate(0,0)');
            setStyle(oPartnerContent2, 'transform', 'translate(0,0)');
        },
        outAn: function () {
            let oPartnerContent1 = getByClass(oPartnerContent, 'partnerContent1')[0];
            let oPartnerContent2 = getByClass(oPartnerContent, 'partnerContent2')[0];
            oPartnerContent1.style.opacity = 0;
            oPartnerContent2.style.opacity = 0;
            setStyle(oPartnerContent1, 'transform', 'translate(-200px,0)');
            setStyle(oPartnerContent2, 'transform', 'translate(200px,0)');
        }
    }];

    for (let i = 0; i < cjAnimate.length; i++) {
        cjAnimate[i].outAn();
    }

    function $(id) {
        return document.getElementById(id);
    }

    function showMusic() {
        let onoff = true; // 代表播放开关打开
        oMuisc.onclick = function () {
            if (onoff) {
                this.style.background = 'url("img/musicon.gif")';
                oAudio.play()
            } else {
                this.style.background = 'url("img/musicoff.gif")'
                oAudio.pause();
            }
            onoff = !onoff;
        }
    }

    function viewWidth() {
        return window.innerWidth || document.documentElement.clientWidth;
    }

    function viewHeight() {
        return window.innerHeight || document.documentElement.clientHeight;
    }

    function getByClass(oParent, sClass) {
        let aElem = oParent.getElementsByTagName('*');
        let arr = [];
        for (let i = 0; i < aElem.length; i++) {
            if (aElem[i].className == sClass) {
                arr.push(aElem[i]);
            }
        }
        return arr;
    }

    function setStyle(obj, attr, value) {
        obj.style[attr] = value;
        obj.style['webkit' + attr.toString(0, 1).toUpperCase() + attr.toString(1)] = value;
    }
}