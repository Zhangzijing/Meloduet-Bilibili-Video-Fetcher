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
function getVideoInfo(aid,onSuccess,onFailed,page=1) {
    //http://api.bilibili.com/view?type=json&appkey=8e9fc618fbd41e28&id=102279
   var url_o = "http://api.bilibili.com/view?type=jsonp&appkey=8e9fc618fbd41e28&id=" + aid + "&page=" + page;
    console.log(page);
    $.ajax({
        type: "GET",
        url: url_o,
        dataType: "jsonp",
    }).success(function(data) {
         console.log(data);
         if(data.title==undefined)
    			{
    				onFailed();
    				//log("getVideoInfo",  data)
    			}
    	else
         	onSuccess(data);
         return;
    }).fail(function(){
        onFailed();
    });
}


function getVideoAllFormat(cid,onSuccess,onFailed) {
	var argument =  ("cid="+cid+"&appkey=f3bb208b3d081dc8&otype=json&quality=3");
    var url_proxy = "playurl.php?argument="+escape(argument);
    console.log(url_proxy);
    $.ajax({
        type: "GET",
        url: url_proxy,
        dataType: "json",
    }).success(function(data) {
    	//console.log("getVideoAllFormat",data)
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


function millisecondToDate(msd) {
    var time = parseFloat(msd) / 1000;
    if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) {
            time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
                parseInt(time / 60.0)) * 60) + "秒";
        }
        else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
                parseInt(time / 3600.0)) * 60) + "分钟" +
                parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
        }
        else {
            time = parseInt(time) + "秒";
        }
    }
    return time;
}

function bytesToSize(bytes) {  
       if (bytes === 0) return '0 B';  
  
        var k = 1024;  
  
        var sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];  
  
        var i = Math.floor(Math.log(bytes) / Math.log(k));  
  
    return (bytes / Math.pow(k, i)).toPrecision(4) + ' ' + sizes[i] ;   
       //toPrecision(3) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];  
}  

