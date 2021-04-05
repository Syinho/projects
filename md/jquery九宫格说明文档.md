[Toc]

## html结构
- `div#box`作为主容器和定位容器。`div.item`作为`img`的容器
- 注意`div.item`的`z-index:1`很重要，保证了拖放过程不会把`img`移走，因为`img`自带`draggable:true`)。
- `img`本身只作为展示用的图片，方便通过`$('').html()`来快速复制转移`img`图片到其它元素中去。


## 逻辑解析
- 九宫格并没有依照HTML的拖放API进行编写，而是模仿拖放的`mousedown`,`mousemove`,`mouseup`三种事件进行编写


### mousedown
- 对任意`div.item`监听`mousedown`事件，对其处理如下
  - 记录鼠标点击的位置
  - 克隆点击的div.item，通过记录的位置使它绝对定位在点击的`div.item`的上方（记得要添加到`#box`里面）
  - 复制所点击的`div.item`的内部html到克隆的元素中
  - 删除点击的`div.item`的内部html

### mousemove
- 此时要对`document`进行监听`mousemove`事件。
- 对mousemove事件只有一个要求：鼠标走到哪，克隆元素跟到哪儿。

### mouseup
- 松开鼠标，此时根据勾股定理，记录当前克隆元素与各个`div.item`的距离（除了最后一个，最后一个是克隆元素本身）。
- 判定出最小距离和最小的的那个`div.item`的序号。
- 再判定，如果是初始元素本身，直接返回。
- 如果不是初始元素，对目标元素进行同样的克隆操作，使新的克隆元素绝对定位于目标元素之上。
- 写动画，让两个克隆元素分别去到各自母元素所在位置。
- 动画执行完成，删除两个克隆元素，恢复两个母元素的内部html。

## 需要用到的API
- `$('').position()`
- `$('').offset()`
- `e.pageX`
- `e.offsetX`
- `.html()`
- `.index()`
- `MATH.sqrt()`
- `MATH.pow()`
- `.eq()`:eq是可以写外面的