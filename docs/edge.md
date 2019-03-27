## edges 数组项为对象，格式如下： 

| key  |      description                         |required| default |
|:-----------:|:----------------------------------------:|:------:|:-------:|
| from | `[Number]或[String]`起始节点的id          |   yes   |  /  |
| to | `[Number]或[String]`终止节点的id |   yes   |  /   |
| title | `[String]`连线名称，会一直显示 |   no   |  ''  |
| tips | `[String]`连线名称，只有hover才会显示，会覆盖掉title       |   no   |  ''  |
| style | `[Object]`连线的样式设置，具体配置见下方|   no   |  {}  |

> 可配置为对象的详细参数

*style*

| key  |      description                         |required| default |
|:-----------:|:----------------------------------------:|:------:|:-------:|
| color | `[RGB]`连线颜色，必须为RGB格式的字符串|   no   |  '22,124,255'  |
| fontColor | `[RGB]`字体颜色，必须为RGB格式的字符串|   no   |  '0,0,0'  |
| arrow | `[Number]`箭头,数字越大，箭头越大|   no   |  null  |
| arrow | `[Number]`箭头方向是否正确显示|   no   |  false  |
| dashed | `[Number]`箭头虚线的间隔,数字越大，箭头虚线间隔越大|   no   |  0  |