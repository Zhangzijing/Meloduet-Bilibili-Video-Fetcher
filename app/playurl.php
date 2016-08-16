<?php /*保证跨站请求API进行的二次代理, 可以使用第三方JSONP代理这样就可以不用搭建服务器.*/
$url="http://interface.bilibili.com/playurl?".urldecode( $_GET["argument"]);
echo file_get_contents($url);
	?>