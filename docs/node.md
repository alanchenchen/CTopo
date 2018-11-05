## nodes 数组项为对象，格式如下：

| key  |      description                         |required| default |
|:-----------:|:----------------------------------------:|:------:|:-------:|
| id | `[Number]或[String]`节点唯一标识          |   yes   |  /  |
| x | `[Number]`节点的x坐标,不填会随机生成一个在canvas容器范围内的值 |   no   |  随机数   |
| y | `[Number]`节点的y坐标,不填会随机生成一个在canvas容器范围内的值 |   no   |  随机数  |
| label | `[String]`节点名称       |   no   |  ''  |
| shape | `[String]`节点形状，只能选择‘circle’(圆形)和‘image’(图片)，默认为正方形|   no   |  ''  |
| group | `[String]`多个节点放入一个样式组的组名，这里group表示多个节点同时调用option里对应group的配置|   no   |  ''  |
| image | `[URL String]`节点形状，如果选择shape为image，这里必须为图片的路径|   no   |  ''  |
| size | `[Array]`节点大小，数组项为数字，分别标识宽和高,如果节点为圆形，则表示半径，如果为图片，不设置size，则为原图大小|   no   |  [32, 32]  |
| color | `[RGB]`节点颜色，必须为RGB格式的字符串|   no   |  '22,124,255'  |
| opacity | `[Number]`节点透明度，可选0~1|   no   |  1  |
| font | `[Object]`节点内字体样式，具体配置见下方|   no   |  {}  |
| border | `[Object]`节点边框样式，具体配置见下方|   no   |  {}  |
| transform | `[Object]`节点形变，具体配置见下方|   no   |  {}  |
| alarm | `[Object]`节点告警，会在节点上方显示告警内容，具体配置见下方|   no   |  {}  |
| visible | `[Boolean]`节点是否可见|   no   |  true  |
| dragable | `[Boolean]`节点是否可拖动|   no   |  true  |
| selected | `[Boolean]`节点是否一加载被选中|   no   |  false  |
| editable | `[Boolean]`节点是否可编辑|   no   |  false  |
> 可配置为对象的详细参数

*font*

| key  |      description                         |required| default |
|:-----------:|:----------------------------------------:|:------:|:-------:|
| color | `[RGB]`字体颜色，必须为RGB格式的字符串|   no   |  '0,0,0'  |
| size | `[String]`字体字号和样式,必须带上fontfamliy|   no   |  '16px 微软雅黑'  |
| position | `[String]`字体布局，只能选择‘Top’(上方)，‘Middle’(中间)和‘Bottom’(下方)|   no   |  'Bottom'  |

*border*

| key  |      description                         |required| default |
|:-----------:|:----------------------------------------:|:------:|:-------:|
| width | `[Number]`边框宽度|   no   |  0  |
| radius | `[Number]`边框弧度|   no   |  null  |
| color | `[RGB]`边框颜色,必须为RGB格式的字符串|   no   |  '255,255,255'  |

*transform*

| key  |      description                         |required| default |
|:-----------:|:----------------------------------------:|:------:|:-------:|
| rotate | `[Number]`节点旋转角度|   no   |  0  |
| scale | `[Number]或[Array]`节点缩放, 默认不缩放，参数若为数字，表示x和y缩放一致，若为数组，分别表示x和y方向缩放 |   no   |  1  |

*alarm*

| key  |      description                         |required| default |
|:-----------:|:----------------------------------------:|:------:|:-------:|
| name | `[String]`告警内容|   no   |  ''  |
| color | `[RGB]`告警背景颜色，必须为RGB格式的字符串|   no   |  /  |
| opacity | `[Number]`告警透明度|   no   |  1  |