# CTopo

![](https://img.shields.io/npm/v/ctopo.svg)
![](https://img.shields.io/npm/dt/ctopo.svg)
![](https://img.shields.io/github/license/alanchenchen/CTopo.svg)

> 基于JTopo完全二次封装，模仿vis库的network模块的api使用方法，实现topo图更加简单

> version:  0.1.0

> Author:  Alan Chen

## Features
1. 完全封装JTopo基础api，模仿现有vis库network的api使用方法。
2. 解决鼠标cursor报错和滚轮缩放方向bug，修改源码中callee，现支持es5严格格式不报错。
3. 只处理topo图逻辑，省略了JTopo中表格部分。

## Why
* 目前能用的topo图插件库是比较少的，国内外专门做这方面的可视化插件库大多需要收费，像国内的*Qunee*和*Hightopo*非常适合公司项目，但是需要收费，大部分国外插件库也需要收费。我所能查到的免费插件库推荐以下几个。
* 免费使用的topo图插件库：
    1. *vis* github开源，APACHE-2.0的license。自带很多模块，network主要用来处理topo图，但是在我使用过程中存在一个问题，无法自动处理两个节点之间重复的连线，默认开启物理特效模式可以展示多连线，但是一旦关闭特效就会覆盖所有连线只显示一条(相关issue有很多，作者表示目前无法解决)。这个问题可以通过自带的api取巧解决，但是操作起来十分麻烦，需要写一个以数字0隔开两边互为相反数的数列算法来实现，这样两侧线条弧度一致只是弯曲方向相反。数列类似于：`-6,-4,-2,0,2,4,6`。详情见我提过的[issue](https://github.com/almende/vis/issues/3905)。vis还有一个问题就是不支持节点组，目前只支持多个节点合成一个集群，但是一旦集群分散后就无法重新聚合。这个问题也有[issue](https://github.com/almende/vis/issues/3293)提过,我在里面也提了问题。这个问题无解，所以我只好放弃了，*JTopo*，*Qunee*和*Hightopo*都原生支持节点组功能。
    2. *sigma* gitub开源，MIT的license。它和*vis*最大的区别在于*vis*是直接整合了所有功能，但是*sgima*本身只有一个绘制canvas的简易功能，*sgima*有很多插件可以使用，使用这些丰富的插件可以实现topo图，缺点是文档少的可怜，github的wiki也是介绍的摸棱两可，甚至在StackOverflow上也很难找到一些与我项目契合的demo。只能说库很好，对于新手入门门槛太高。另说一句，*vis*文档相当齐全，虽然是全英文。
    3. *d3* github开源，BSD 3-Clause的license。*d3*是个非常强悍的插件库，甚至可以说前端可视化通过d3可以完全做到。*d3*的力导向图可以用来做topo图。但是我没选择d3的原因是d3在v5版本前一直以svg为主，最新版本虽然增加了canvas，但是大部分api还是只兼容svg。需要强调一句的是，*d3*本身不处理svg，它是一个以数据驱动的类似于jq的链式调用的插件。所以svg应该怎么显示需要开发者掌握svg基础，这对我而言临时增加了学习成本，所以放弃了。但是不得不说的是，如果你想自由开发你想的任何东西，请学习*d3*。 
    4. *JTopo* github没有找到官方仓库，目前不知道是哪种开源协议。目前官网已经挂掉，只能通过百度才能去看部分api文档！这是一个大牛在2013年开源，2014年停止维护的插件。插件直接在作者的网站即可下载，插件实现了很多功能，其中解决了我在*vis*中遇到的两个问题。但是*JTopo*由于长时间没有维护导致代码停留在es3时代。没有实现模块化，并且其中大量使用的callee语法在es5的strict模式下报错，拓扑图的滚轮缩放方向也是相反方向。
    5. *g6* gitub开源，MIT的license。阿里蚂蚁金服基于自研的G引擎衍生出的专做关系图的插件库。功能非常丰富，大部分api与vis像，可定制程度高，后期ctopo可能会丢弃过时的JTopo而重新基于g6封装一层api。
## CTopo做了哪些东西
首先，CTopo更改了部分JTopo源码，JTopo代码书写格式让我很难受。。。因为作者并没有开源，我仅仅是把压缩过的代码美化后拿来修改，去除了代码中的所有callle语法，现在webpack不再报错，可以正确被转译为es5的strict模式。然后CTopo重新写了一个接口层，基本模仿vis的network使用方法。你会看到一个新的JTopo。哈哈

## Usage Help
1. `npm install ctopo --save` or `yarn add ctopo`。 或者直接script引入即可(ctopo直接挂载在windows对象下)
2. 使用插件必须要保证html中存在一个canvas标签，例如：
``` javascript
    import CTopo from 'ctopo'

    const network = new CTopo('.canvas') // 构造器只接受一个参数，必须是canvas标签的class名、id名或tag名
```
## Options
* 构造函数，construtor必须接收一个参数，当前绑定topo的canvas类名或id名，与jq选择器一致,必须是canvas标签。设置canvas宽高建议直接通过setAtrribute。
* 实例方法：
    1. `setData(dataset)` 设置topo图的节点、连线和节点组等数据。dataset是个对象，包含3个可选键  
        * [nodes(Array)节点](./docs/node.md)  
        * [edges(Array)连线](./docs/edge.md)
        * [containers(Array)节点组](./docs/container.md) 
    2. `setOption(options)` 设置画布舞台和group等配置。options是个对象，包含2个可选键  
        * [groups(Object)多个节点的重复配置](./docs/groups.md)  
        * [config(Object)画布舞台的整体配置](./docs/config.md) 
    3.  `update(dataset)` 更新topo图的节点和连线数据。dataset是个对象，包含2个可选键  
        > update只会更新对应id的节点或连线，不会重新刷新canvas。
        * nodes(Array)节点, id必选  同setData()中nodes的可选键，除了没有image，shape和group，其余完全一致  
        * edges(Array)连线, id必选  同setData()中edges的可选键完全一致
        * node和edge的id建议从监听事件返回参数获取(target.data.id)。node的id是创建节点时开发者手动输入，而edge的id是插件自动生成(Symbol类型)
    4.  `add(dataset)` 添加一个或多个topo图的节点、连线和节点组等数据。dataset是个对象，包含3个可选键  
        > 参数和用法与`setData()`完全一致。
    5.  `remove(dataset)` 删除一个或多个topo图的节点和连线等数据。dataset是个对象，包含2个可选键  
        * nodes(Array)节点  nodes的数组项为String或Number类型，只有一个值，为node创建时手动传入的id
        * edges(Array)连线  edges的数组项为Symbol类型，为edge创建时插件生成的id。由于Symbol的唯一性，所以edge的id只能从监听事件返回参数中获取(target.data.id)
        * 例：
            ```js
                remove({
                    nodes: ['1', '2'],
                    edges: [Symbol(0), Symbol(1)]
                })
            ```
    6. `getPosition()` 获取当前所有节点的位置信息 return一个数组，无参数
    7. `setPosition(positions)` 设置对应id的节点坐标位置。 positions为数组，数组项必须包含id、x和y3个键值。x和y必须是数字
    8. `on(eventType, cb)` 绑定事件，有2个参数:
        * eventType目前支持
            * 'click'(单击)
            * 'dbclcik'(双击)
            * 'contextmenu'(右键)
            * 'mousemove'(鼠标移动)
            * 'drag'(拖动)
            * dragEnd'(拖动节点结束，只有节点位置发生改变才会触发)
        * 回调函数return 一个对象。包含:
            * `DOM` --> 鼠标在body DOM元素上的page位移坐标(pageX和pageY)
            * `canvas` --> 鼠标在canvas画布上的x和y坐标
            * `target` --> 鼠标当前选中的node或edge或container等数据，包含选中的所有canvas属性以及自定义传入的数据(挂载在data属性上)
            * `type` -->  当前选中的是哪种类型，如：node或link或container
    9. `off(eventType)` 解绑定事件，只有一个参数, 参数和`on(eventType, cb)`第一个参数可选范围一致
   
## Attentions
1. setOption必须在setData之后调用。setData可以连续调用，数据不会叠加，而setOption调用一次就会保存当前的配置
2. dragEnd事件只有在鼠标移动后，发现node节点有位置移动才触发
3. 可以在nodes或者edges的单个对象里传入别的数据，这些数据存在nodes或者edges实例的data属性里
4. 本文档并没有写全JTopo里的所有api用法，例如，可以单独修改stage、node或者edge的属性。这些api需要开发者自行去百度JTopo。
> 目前JTopo作者也没给出完善的文档，入坑需谨慎。

## DEMO
[代码](https://runjs.cn/code/s1ycvhqr)
[展示](https://sandbox.runjs.cn/show/s1ycvhqr)


