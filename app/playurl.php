<?php
/*
 * 保证跨站请求API进行的二次代理, 可以使用第三方JSONP代理这样就可以不用搭建服务器.
 */
    
    echo file_get_contents("http://interface.bilibili.com/playurl?cid=".$_GET["cid"]."&appkey=f3bb208b3d081dc8&type=hdmp4&otype=json");   
    
?>