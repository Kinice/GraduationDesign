# Node 入门分享
#### by Kinice
## 什么是node?
node是Ryan Dahl于2009年制作的一个基于**ChomeV8引擎**的一款javascript运行环境。

chrome的组成部分：

HTML(webkit) -> javascript(v8) -> 中间层 -> 硬件

node的组成部分：

v8 -> 中间层 -> 硬件（except 显卡）

## 为什么是javascript？
javascript是一门受限制的语言，它作为一门图灵完备的语言却一直受限于浏览器这个沙箱，能力取决于沙箱中间层的强大程度。

javascript的语言特点适合于构建一个高性能web服务器：事件驱动、异步非阻塞I/O。

javascript使用的人多(╭￣3￣)╭♡

node 4.0版本以上支持ES6语法。
## node 的特点
### 异步I/O
就像发起AJAX请求一样。

遇到阻塞 -> 跳过阻塞事件，执行下一个任务 -> 阻塞事件完成 

### 事件机制与回调函数

node完成任务使用的方法是：**监听事件**
