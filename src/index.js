/**
 * @name Topo图插件二次封装，基于JTopo 0.4.8
 * @description 完全封装JTopo基础api，解决鼠标cursor报错和滚轮缩放方向bug，修改源码中callee，现支持es5严格格式不报错
 * @author Alan Chen
 * @version 2019/3/26
 * 
 * @constructor 
 * @param {selector|String} DOM 必选 构造函数接受一个参数，当前绑定topo的canvas类名或id名，与jq选择器一致,必须是canvas标签
 * @instance  实例方法
 * @method setData(dataset) 设置topo图的节点、连线和节点组等数据 
 *       dataset包含3个可选键  nodes(Array)节点  edges(Array)连线 containers(Array)节点组 
 *       
 *       nodes 数组项为对象，必选id(Number | String 节点唯一标识)
 *             可选键如下：
 *              x (Number)--节点的x坐标,不填会随机生成一个在canvas容器范围内的值
 *              y (Number)-- 节点的y坐标,不填会随机生成一个在canvas容器范围内的值
 *              label (String)--节点名称   
 *              shape (String)--节点形状，只能选择‘circle’(圆形)和‘image’(图片)，默认为正方形
 *              group (String) -- 多个节点放入一个样式组的组名，这里group表示多个节点同时调用option里对应group的配置
 *              image (String URL)--如果选择shape为image，这里必须为图片的路径
 *              size (Array)--节点大小，数组项为数字，分别标识宽和高,默认为32.如果节点为圆形，则表示半径，如果为图片，不设置size，则为原图大小
 *              color (RGB)--节点颜色，默认为‘22,124,255’，必须为RGB格式的字符串
 *              opacity (Number)--节点透明度，默认为1
 *              font (Object)--节点内字体样式
 *                    color(RGB)--字体颜色，默认为‘0,0,0’，必须为RGB格式的字符串     
 *                    size(String)--字体字号和样式,必须带上fontfamliy，例：‘16px 微软雅黑’
 *                    position(String)--字体布局，只能选择‘Top’(上方)，‘Middle’(中间)和‘Bottom’(下方)，默认‘Bottom’
 *              border (Object)--节点边框样式
 *                    width(Number)--边框宽度，默认为0
 *                    radius(Number)--边框弧度，默认为null
 *                    color(RGB)--边框颜色，默认为‘255,255,255’，必须为RGB格式的字符串
 *              transform (Object)--节点形变
 *                   rotate(Number)--节点旋转角度，默认为0
 *                   scale(Number | Array)--节点缩放，默认不缩放，参数若为数字，表示x和y缩放一致，若为数组，分别表示x和y方向缩放
 *              alarm (Object)--节点告警，会在节点上方显示告警内容
 *                     name(String)--告警内容
 *                     color(RGB)--告警背景颜色，必须为RGB格式的字符串   
 *                     opacity(Number)--告警透明度，默认为1
 *              visible (Boolean)--节点是否可见，默认true
 *              dragable (Boolean)--节点是否可拖动，默认true
 *              selected (Boolean)--节点是否一加载被选中，默认false
 *              editable (Boolean)--节点是否可编辑，默认false
 *        
 *        edges 数组项为对象，必选from(Number | String 起始节点的id)和to(Number | String 终止节点的id)
 *              可选键如下：
 *              title (String)--连线名称，会一直显示
 *              tips (String)--连线名称，只有hover才会显示，会覆盖掉title
 *              style (Object)--连线的样式设置
 *                    arrow (Number)--箭头，默认为null，数字越大，箭头越大
 *                    arrowEnabled (Boolean)--箭头方向是否正确显示
 *                    color (RGB)--连线颜色，默认为‘22,124,255’，必须为RGB格式的字符串
 *                    fontColor (RGB)--字体颜色，默认为‘0,0,0’，必须为RGB格式的字符串
 *                    dashed (Number)--箭头虚线的间隔，默认为0，数字越大，箭头虚线间隔越大
 *  
 *        containers 数组项为对象，必选nodes(Array | 节点组包含的节点id)
 *                   可选键如下：
 *                   name (String)--节点组名称
 *                   可选键还包含color、font、border和可配置项，用法与nodes一致。
 *                   主要包括背景色、字体、边框和可配置项。
 * 
 * @method setOption(options) 设置画布舞台和group等配置
 *       options包含2个可选键  groups(Object)多个节点的重复配置  config(Object)画布舞台的整体配置
 *        
 *       groups 对象，
 *              键名为group的名称，必须和node中的group值一致，只会匹配与当前键名相同的node来配置样式
 *              键值为一个对象，表示样式配置，除去label、group和size等选项其余可选键与nodes一致。
 *                            主要包括背景色、字体、边框、告警、透明度、形变和可配置项。
 *                            shape只能选择‘image’并且必须同时设置image属性，可以设置节点为图片
 *       config 对象
 *              可选键如下：
 *              eagleEye (Boolean)--控制鹰眼的显示。默认为false，关闭鹰眼
 *              disableWheelZoom (Boolean)--是否禁用滚轮缩放整个画布。默认为false，可以滚轮缩放
 * 
 * @method update(dataset) 更新topo图的节点和连线等数据
 *      dataset包含2个可选键  nodes(Array)节点  edges(Array)连线
 *      
 *      nodes 数组项为对象
 *            必选id(String或Number类型)。id为node创建时手动传入
 *            可选键：同setData()中nodes的可选键，除了没有image，shape和group，其余完全一致
 *      
 *      edges 数组项为对象
 *            必选id(Symbol类型)
 *                  id为edge创建时插件生成。由于Symbol的唯一性，所以edge的id只能从监听事件返回参数中获取(target.data.id)
 *            可选键：同setData()中edges的可选键完全一致
 * 
 * @method add(dataset) 添加一个或多个topo图的节点、连线和节点组等数据    
 *      dataset包含3个可选键  nodes(Array)节点  edges(Array)连线 containers(Array)节点组
 *      注：参数和用法与setData()完全一致
 * 
 * @method remove(dataset) 删除一个或多个topo图的节点和连线等数据 
 *      dataset包含2个可选键  nodes(Array)节点  edges(Array)连线    
 *          nodes的数组项为String或Number类型，只有一个值，为node创建时手动传入的id
 *          edges的数组项为Symbol类型，为edge创建时插件生成的id。由于Symbol的唯一性，所以edge的id只能从监听事件返回参数中获取(target.data.id)
 *      例：remove({
 *              nodes: ['1', '2'],
 *              edges: [Symbol(0), Symbol(1)]
 *          })
 * 
 * @method getPosition() 获取当前所有节点的位置信息 return一个数组。
 * 
 * @method setPosition(positions) 设置对应id的节点坐标位置。
 *       positions为数组，数组项必须包含id、x和y3个键值。x和y必须是数字
 * 
 * @method on(eventType,cb) 绑定事件，有2个参数
 *          目前支持
 *              'click'(单击),'dbclcik'(双击)
 *              'contextmenu'(右键)
 *              'mousemove'(鼠标移动)
 *              'drag'(拖动)和dragEnd'(拖动节点结束)
 *          回调函数return 一个对象。包含
 *              DOM --> 鼠标在body DOM元素上的page位移坐标(pageX和pageY)
 *              canvas --> 鼠标在canvas画布上的x和y坐标
 *              target --> 鼠标当前选中的node或edge或container等数据，包含选中的所有canvas属性以及自定义传入的数据(挂载在data属性上)
 *              type -->  当前选中的是哪种类型，如：node或link或container
 * 
 * @method off(eventType) 解绑定事件，只有一个参数，目前支持
 *             'click'(单击),'dbclcik'(双击)
 *             'contextmenu'(右键)
 *             'mousemove'(鼠标移动)
 *             'drag'(拖动)和dragEnd'(拖动节点结束)
 *
 * @summary
        (1) setOption必须在setData之后调用，setData可以连续调用，数据不会叠加
        (2) dragEnd事件只有在鼠标移动后，发现node节点有位置移动才触发
        (3) 可以在nodes或者edges的单个对象里传入别的数据，这些数据存在nodes或者edges实例的data属性里
 *  */


import {JTopo} from'./JTopoCode'
class Topo {
    constructor(DOM) {
        this.version = require('../package.json').version
        this.baseVersion = `Based on JTopo-${JTopo.version}`
        this.eventLoop = []
        this.init(DOM)
    }
    init(i) {
        this.canvas = document.querySelector(i)
        this.stage = new JTopo.Stage(this.canvas)
        this.stage.wheelZoom = 0.85
        this.scene = new JTopo.Scene(this.stage)
    }
    setNodeConfig(node, config) {
        const isValueExist = v => {
            const type = typeof v
            if(type == 'string') {
                return true
            }
            else if(type == 'number') {
                return true
            }
            else if(type == 'undefined') {
                return false
            }
            else if(type == 'object') {
                return v === null? false: true
            }
        }
        //node节点文本
        if(isValueExist(config.label)) {
            node.text = config.label
        }
        //node节点颜色
        if(isValueExist(config.color)) {
            node.fillColor = config.color
        }
        //node节点透明度
        if(isValueExist(config.opacity)) {
            node.alpha = config.opacity
        }
        //node节点内字体
        if(isValueExist(config.font)) {
            //字体颜色
            if(isValueExist(config.font.color)) {
                node.fontColor = config.font.color
            }
            //字体大小和格式
            if(isValueExist(config.font.size)) {
                node.font = config.font.size
            }
            //字体位置
            if(isValueExist(config.font.position)) {
                node.textPosition = config.font.position + '_Center'
            }
        }
        //node节点边框
        if(isValueExist(config.border)) {
            //边框宽度
            if(isValueExist(config.border.width)) {
                node.borderWidth = config.border.width
            }
            //边框弧度
            if(isValueExist(config.border.radius)) {
                node.borderRadius = config.border.radius
            }
             //边框颜色
            if(isValueExist(config.border.color)) {
                node.borderColor = config.border.color
            }
        }
        //node节点形变
        if(isValueExist(config.transform)) {
            //z轴旋转
            if(isValueExist(config.transform.rotate)) {
                node.rotate = config.transform.rotate
            }
            //x和y放向缩放
            if(typeof config.transform.scale == 'number') {
                node.scaleX = config.transform.scale
                node.scaleY = config.transform.scale
            }
            else if(Array.isArray(config.transform.scale)) {
                node.scaleX = config.transform.scale[0]
                node.scaleY = config.transform.scale[1]
            }
        }
        //node告警配置
        if(isValueExist(config.alarm)) {
            if(isValueExist(config.alarm.name)) {
                node.alarm = config.alarm.name
            }
            if(isValueExist(config.alarm.color)) {
                node.alarmColor = config.alarm.color
            }
            if(isValueExist(config.alarm.opacity)) {
                node.alarmAlpha = config.alarm.opacity
            }
        }
        //node的可配置性
        node.visible = config.visible == undefined?true:config.visible
        node.dragable = config.dragable == undefined?true:config.dragable
        node.selected = config.selected || false	
        node.editAble = config.editable || false
    }
    setData({nodes, edges, containers}, clear=true) {
        if(Boolean(clear)) {
            this.scene.clear() //每次先清除画布，避免数据重复
        }
        //ndoe节点
        nodes && nodes.forEach( (item, index) => {
            let node
            const x = Number.parseFloat(item.x)
            const y = Number.parseFloat(item.y)
            //node的形状
            if(item.shape == 'circle') {
                node = new JTopo.CircleNode(item.label)
                if(item.size) node.radius = Math.max(...item.size)
            }
            else if(item.shape == 'image') {
                node = new JTopo.Node(item.label)
                if(item.size) {
                    node.setImage(item.image)
                    node.setBound(x,y,...item.size)
                }
                else {
                    node.setImage(item.image, true)
                }
            }
            else{
                node = new JTopo.Node(item.label)
                if(item.size) {
                    node.setSize(...item.size)	
                }
            }
            node.fontColor = '0,0,0' //所有node默认字体为黑色
            this.setNodeConfig(node, item)
            //如果没有传入坐标值，默认给一个随机坐标
            const nodeX = x || Math.random()*this.canvas.width
            const nodeY = y || Math.random()*this.canvas.height
            node.setLocation(nodeX,nodeY)
            node.data = item
            node._index = index //给每个node添加一个数字索引，用于排序连线的两个节点顺序
            this.scene.add(node)
        })
        this.nodes = this.scene.childs.filter(child => child.elementType == 'node')

        //edge连线
        edges && edges.forEach((item, index) => {
            const fromNode = this.nodes.find(child => item.from !=undefined &&child.data.id == item.from)
            const toNode = this.nodes.find(child => item.to !=undefined && child.data.id == item.to)
            //将连线的两个节点排序，永远使from的_index小于to的_index。避免相反方向连线重叠！
            const sortNodes = [fromNode, toNode].sort((a,b) => a._index - b._index)
            // 通过style.arrowEnabled来判断箭头方向是正确显示还是排序显示避免连线重叠
            const isArrowRight = item.style && item.style.arrowEnabled
            const source = isArrowRight? fromNode: sortNodes[0]
            const destinate = isArrowRight? toNode: sortNodes[1]
            if(fromNode && toNode) {
                let link = new JTopo.Link(source, destinate, item.title) 
                link.bundleOffset = 35
                link.bundleGap = 20
                link.textOffsetY = 5
                
                if(item.tips) { //tips显示文本，hover效果，会覆盖掉title
                    link.mouseover(() =>{
                        link.text = item.tips
                    })
                    link.mouseout(() =>{
                        link.text = ''
                    })
                }
                link.arrowsRadius = item.style && item.style.arrow
                if(item.style && item.style.color) {
                    link.strokeColor = item.style.color
                }
                link.fontColor = (item.style && item.style.fontColor) || '0,0,0'
                link.dashedPattern = item.style && item.style.dashed
                
                link.data = item
                // 生成一个不会重复的值作为link的唯一id
                // link.data.id = link._id
                link.data.id = Symbol(index)
                this.scene.add(link)
            }
        })
        this.edges = this.scene.childs.filter(child => child.elementType == 'link')

        //container节点组
        containers && containers.forEach( item => {
            const wrap = new JTopo.Container(item.name)
            wrap.fontColor = '0,0,0'
            this.setNodeConfig(wrap,item)
            const wrapNodes = this.nodes.filter(a => {
                return item.nodes.includes(a.data.id)
            })
            wrapNodes.forEach(a => {
                wrap.add(a)
            })
            this.scene.add(wrap)
        }) 
        this.containers = this.scene.childs.filter(child => child.elementType == 'container')
        //每次渲染完数据后都判断是否配置规则
        this.options && this.setOption(this.options)
    }
    setOption(options) {
        this.options = options
        const groups = options.groups
        const config = options.config
        //多个node相同的配置成为group组
        if(groups) {
            const entries = Object.entries(groups)
            let groupNodes = []
            entries.forEach(item => {
                const nodes = this.nodes.filter(a => {
                    return a.data.group == item[0]
                })
                groupNodes.push({node: nodes, option: item[1]})
            })
            groupNodes.forEach(a => {
                a.node.forEach(b => {
                    // //设置node为图片
                    if(a.option.shape == 'image' && a.option.image) {
                        b.setImage(a.option.image, true)
                    }
                    //通过config来匹配操作 
                    this.setNodeConfig(b, a.option)
                })
            })
        }
        //舞台画布的整体配置
        this.stage.eagleEye.visible = config && config.eagleEye //鹰眼默认关闭
        this.stage.wheelZoom = config && Boolean(config.disableWheelZoom) 
                               ? false
                               : 0.85 //默认开启滚轮缩放

    }
    update({nodes, edges}) {
        //ndoe节点
        nodes && nodes.forEach( item => {
            let targetNode = this.nodes.find(child => child.data.id == item.id)   
            if(Boolean(targetNode)) {
                this.setNodeConfig(targetNode, item)
                if(item.x && item.y) {
                    targetNode.setLocation(item.x, item.y)
                }
                if(item.size) {
                    targetNode.setSize(...item.size)
                }
                
                // 合并额外传入的值data
                targetNode.data = {...targetNode.data, ...item}
            }
            else {
                console.warn(`没有对应id为${item.id}的节点，所以无法更新`)
            }       
        })

        //edge连线
        edges && edges.forEach( item => {
            let targetLink = this.edges.find(child => child.data.id == item.id)
            if(Boolean(targetLink)) {
                targetLink.text = String(item.title)
                if(item.tips) { //tips显示文本，hover效果，会覆盖掉title
                    targetLink.removeEventListener('mouseover')
                    targetLink.removeEventListener('mouseout')
                    targetLink.mouseover(() =>{
                        targetLink.text = String(item.tips)
                    })
                    targetLink.mouseout(() =>{
                        targetLink.text = ''
                    })
                }
                
                if(item.style) {
                    if(item.style.color) {
                        targetLink.strokeColor = item.style.color
                    }
                    if(item.style.fontColor) {
                        targetLink.fontColor = item.style.fontColor
                    }
                    if(item.style.arrow) {
                        targetLink.arrowsRadius = item.style.arrow
                    }
                    if(item.style.dashed) {
                        targetLink.dashedPattern = item.style.dashed
                    }
                }
                
                // 合并额外传入的值data
                targetLink.data = {...targetLink.data, ...item}
            }
            else {
                console.warn(`没有对应id为${item.id}的连线，所以无法更新`)
            }
        })
    }
    add({nodes, edges, containers}) {
        this.setData({nodes, edges, containers}, false)
    }
    remove({nodes, edges}) {
        //ndoe节点
        nodes && nodes.forEach( item => {
            let targetNode = this.nodes.find(child => child.data.id == item)   
            if(Boolean(targetNode)) {
                this.scene.remove(targetNode)
            }
            else {
                console.warn(`没有对应id为${item.id}的节点，所以无法删除`)
            }       
        })

        //edge连线
        edges && edges.forEach( item => {
            let targetLink = this.edges.find(child => child.data.id == item)
            if(Boolean(targetLink)) {
                this.scene.remove(targetLink)
            }
            else {
                console.warn(`没有对应id为${item.id}的连线，所以无法删除`)
            }
        })
    }
    eventHandler(name, cb, flag) {
        const eventHandler = {
            // tag是JTopo封装的事件名，raw是js原生事件名
            click: {
                tag: 'click',
                raw: 'click'
            },
            dbclick: {
                tag: 'dbclick',
                raw: 'click'
            },
            mousemove: {
                tag: 'mousemove',
                raw: 'mousemove'
            },
            contextmenu: {
                tag: 'mouseup',
                raw: 'mouseup'
            },
            drag: {
                tag: 'mousedrag',
                raw: 'mousemove'
            },
            dragEnd: {
                tag: 'mouseup',
                raw: 'mouseup'
            }
        }
        const targetEvent = eventHandler[name].tag

        if(targetEvent) {
            if(flag) {//绑定事件
                this.eventLoop.push(name)

                let preNodesLocations = null
                this.scene.addEventListener('mousedown', e => {
                    preNodesLocations = this.getPosition() //指定事件触发前的所有nodes节点的位置
                })
                
                this.scene.addEventListener(targetEvent, e => {
                    const type = e.target? e.target.elementType: null
                    const result = {
                        DOM: {pageX: e.pageX, pageY: e.pageY},
                        canvas: {x: e.x, y: e.y},
                        target: e.target,
                        type
                    }
                    
                    const latterNodesLocations = this.getPosition() //指定事件触发后的所有nodes节点的位置
                    //判断所有节点是否都未移动坐标
                    const didEveryNodesNotMoved = name == 'dragEnd' && latterNodesLocations.every(a => {
                        const relativeNode = preNodesLocations.find(b => b.id == a.id)
                        return (a.x == relativeNode.x && a.y == relativeNode.y)
                    })

                    const contextmenuTrigger = (name == 'contextmenu' && e.button == 2)
                    const dragEndTrigger = (name == 'dragEnd' && e.button == 0 && !didEveryNodesNotMoved)
                    const dragTrigger = (name == 'drag')
                    const clickTrigger = (name == 'click')
                    const dbclickTrigger = (name == 'dbclick')
                    const mousemoveTrigger = (name == 'mousemove')
                    const eventTrigger = (contextmenuTrigger || dragEndTrigger || dragTrigger || clickTrigger || dbclickTrigger || mousemoveTrigger)

                    if(eventTrigger) {
                        cb && cb(result)
                    }
                })
            }
            else { //解绑事件
                this.scene.removeEventListener(targetEvent)
                const index = this.eventLoop.findIndex(a => a == name)
                this.eventLoop.splice(index, 1)
            }
        }
        else {
            throw new Error('The event name is invalid, only clcik, dbclick and contextmenu is valid!')
        }
    }
    on(eType, cb) {
        this.eventHandler(eType, cb, true)
    }
    off(eType) {
        this.eventHandler(eType)
    }
    getPosition() {
        const allNodesPosition = this.nodes.map(a => {
            const id = a.data.id
            const x = a.x
            const y = a.y
            return {id, x, y}
        })
        return allNodesPosition
    }
    setPosition(positions) {
        const isArrayNotNull = Array.isArray(positions) && positions.length> 0
        isArrayNotNull && positions.forEach( a => {
            const moveNodes = this.nodes.find(b => b.data.id == a.id)
            if(moveNodes) {
                const x = Number.parseFloat(a.x)
                const y = Number.parseFloat(a.y)
                moveNodes.setLocation(x, y)
            }
            else {
                console.warn(`没有对应id为${a.id}的节点，所以无法设置坐标`)
            }
        })
    }
}

export default Topo