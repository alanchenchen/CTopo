## groups 为对象 

 1. 键名为group的名称，必须和node中的group值一致，只会匹配与当前键名相同的node来配置样式
 2. 键值为一个对象，表示样式配置，除去label、group和size等选项其余可选键与nodes一致。
 3. 主要包括背景色、字体、边框、告警、透明度、形变和可配置项。
 4. shape只能选择‘image’并且必须同时设置image属性，可以设置节点为图片