'use strict'
function getAidFromStr(str) {
    var avPat = new RegExp('av\\d*');
    var exPat = new RegExp('\\d{4,8}')
    if(avPat.test(str)) {
        return avPat.exec(str)[0].substring(2);
    } else if(exPat.test(str)) {
        return exPat.exec(str)[0];
    } else {
        return -1;
    }
}
/*
 * 获取视频信息并用所给函数处理, 已经过验证, 失败返回-1, 正确返回示例:
 *
*/
function getVideoInfo(aid,onSuccess,onFailed) {
    //http://api.bilibili.com/view?type=json&appkey=8e9fc618fbd41e28&id=102279
    $.ajax({
        type: "GET",
        url: "http://api.bilibili.com/view?type=jsonp&appkey=8e9fc618fbd41e28&id=" + aid,
        dataType: "jsonp",
    }).success(function(data) {
         //console.log(data);
         onSuccess(data);
         return;
    }).fail(function(){
        onFailed();
    });
}

function getVideoAllFormat(cid,onSuccess,onFailed) {
	var argument =  ("cid="+cid+"&appkey=f3bb208b3d081dc8&type=hdmp4&otype=json");
    var url_proxy = "playurl.php?argument="+escape(argument);
    console.log(url_proxy);
    $.ajax({
        type: "GET",
        url: url_proxy,
        dataType: "json",
    }).success(function(data) {
         onSuccess(data);
    }).fail(function(){
        onFailed
    });
    
}/*
function getVideoInfo(cid,onSuccess,onFailed) {
    $.ajax({
        type: "GET",
        url: "http://interface.bilibili.com/playurl?cid="+cid+"&appkey=f3bb208b3d081dc8&type=hdmp4&otype=json",
        dataType: "jsonp",
    }).success(function(data) {
         //console.log(data);
         onSuccess(data);
         return;
    }).fail(function(){
        onFailed();
    });
}
*/

function VideoInfo() {
   this.tid;
   this.typename;
   this.arctype;
   this.play; 
    this.review;
    this.video_review;
    this.favorites;
    this.title;
    this.allow_bp;
    this.allow_feed;
    this.allow_download;
    this.tag;
    this.pic;
    this.author;
    this.mid;
    this.face;
    this.pages;
    this.instant_server;
    this.created;
    this.created_at;
    this.credit;
    this.coins;
    this.spid;
    this.src;
    this.sp_title;
    this.season_id;
    this.season_index;
    this.season_episode;
    this.bangumi=[];
    this.cid;
    this.partname;
    this.offsite;
}

function log(tag,info){
    console.log(tag + ", " + info);
}
