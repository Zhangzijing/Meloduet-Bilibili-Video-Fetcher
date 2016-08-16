'use strict'
//注册控制器
app.controller("MainCtrl", MainCtrl);
app.controller("HomeController", HomeController);
app.controller("AboutController", AboutController);
app.controller("VideoController", VideoController);
app.controller("VideoBatchController", VideoBatchController);
app.controller("NotFoundController", NotFoundController);
//全局Page
app.factory('Page', function() {
	var title = 'default';
	var index = 0;
	return {
		title: function() {
			return title;
		},
		setTitle: function(newTitle) {
			title = newTitle;
		},
		index: function() {
			return index;
		},
		setIndex: function(newIndex) {
			index = newIndex;
		}
	};
});
//主控制器
function MainCtrl($scope, Page) {
	$scope.Page = Page;

}

function HomeController($scope, Page) {
	$scope.index = 0;
	Page.setTitle('Bilibili视频下载')
	Page.setIndex(0);
	$scope.url = '';
	$scope.parse = function() {
		console.log("parse: " + $scope.url);
		//获取aid
		var aid = getAidFromStr($scope.url);
		if(aid == -1) {
			console.log("失败!");
			return;
		} else {
			console.log("获取的aid = " + aid);
		}
		window.location.href = "#/video/" + aid;
	}
	$scope.parse_batch = function(){
		console.log("parse: " + $scope.url);
		//获取aid
		var aid = getAidFromStr($scope.url);
		if(aid == -1) {
			console.log("失败!");
			return;
		} else {
			console.log("获取的aid = " + aid);
		}
		window.location.href = "#/video_batch/" + aid;
	}
	$scope.myKeyup = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.parse();
            }
        };
}

function AboutController($scope, Page) {
	Page.setTitle('关于')
	Page.setIndex(999);
}

function VideoController($scope, Page, $routeParams) {


	Page.setIndex(-1);
	$scope.title = "加载中...";
	$scope.status = "(解析中)"
	$scope.timeParse = millisecondToDate;
	log("VideoController.aid", $routeParams.aid)
	getVideoInfo($routeParams.aid, function(vi) {

			var vi = $.extend(new VideoInfo(), vi)
			log("VideoController", vi.title);
			$scope.$apply(function() {
				$scope.title = vi.title;
				Page.setTitle("BiliBili " + vi.title + " 视频下载页面");
				$scope.videoInfo = vi;
			});
			getVideoAllFormat($scope.videoInfo.cid,
				function(data) {
					$scope.$apply(function() {
						$scope.play = data.durl[0];
						console.log(data);
						$scope.bak1 = $scope.play.backup_url[0];
						$scope.bak2 = $scope.play.backup_url[1];
						$scope.status = "(可以下载了!)"
						$scope.sizeParse = bytesToSize;
					})
				},
				function() {
					$scope.$apply(function() {
						console.log("failed");
						window.location.href = "#/404.html";
					})
				});

		},
		function() {
			$scope.$apply(function() {
				console.log("failed");
			})
			window.location.href = "#/404.html";
		});

}
/*
 * 接口:
                	item.
                		id
                		title
                		url
                		bak1
                		bak2
                		length
                		size
                		danmu
 */
function timeout() {
	setTimeout(function() {
		// Do Something Here
		// Then recall the parent function to
		// create a recursive loop.
		timeout();
	}, 1000);
}

function VideoBatchController($scope, Page, $routeParams) {
	log("VideoBatchController", "entered");
	Page.setIndex(-1);
	Page.setTitle("正在解析...");
	$scope.aid = $routeParams.av;
	
	//获取分P总数

	getVideoInfo($scope.aid,
		//成功
		function(vi) {
			var vi = $.extend(new VideoInfo(), vi);
			$scope.status = "0/" + vi.pages;
			$scope.name = vi.title;
			$scope.count = vi.pages;
			$scope.image = vi.pic;
			$scope.desc = vi.description;	
			$scope.tags = vi.tag.split(",");
			log("VideoBatchController", vi);
			log("VideoBatchController", "count: " + vi.pages + "; aid: " + $scope.aid);
			if(vi.pages == 1) {
				window.location.href = "#/video/" + $scope.aid;
			}
			
			Page.setTitle("[共" + vi.pages + "集]" + vi.title);
			$scope.items = [];
			//获取每一P的视频信息
			var i = 1;
			var getinfo = function(){
					(function(index) {
					getVideoInfo($scope.aid,
						function(vin) {
							$scope.items.push({
								id: index,
								title: vin.partname,
								url: "",
								bak1: "",
								bak2: "",
								length: "",
								size: "",
								danmu: "",
							});
							
							log("VideoBatchController", "成功获取vi, id: " + index);
							//获取下载地址
							var success = function(data){
								$scope.items[index-1].url = data.durl[0].url;
								$scope.items[index-1].size = data.durl[0].size;
								$scope.items[index-1].length = data.durl[0].length;
								$scope.items[index-1].danmu = vin.cid;
								$scope.items[index-1].bak1 = data.durl[0].backup_url[0];
								$scope.items[index-1].bak2 = data.durl[0].backup_url[1];
							};
							var failed = function (data){
								$scope.items[index-1].title = "获取失败";
							};
							log("cid",vin.cid);
							getVideoAllFormat(vin.cid,success,failed);
								$scope.timeParse = millisecondToDate;
						$scope.sizeParse = bytesToSize;
						$scope.status = index + "/" + vi.pages;
							$scope.$apply();
						},
						function() {
							$scope.items.push({
								"title": "解析失败"
							});
							log("VideoBatchController", "失败" + index);
						}, index);
					i++;
					if(index<vi.pages){setTimeout(getinfo,1500);}
				})(i);
				
			}
			getinfo();
		},
		//失败
		function() {
			//window.location.href = "#/404";
		});
	//循环获取源代码
}

function NotFoundController($scope, Page) {
	Page.setIndex(-1);
	Page.setTitle('404 找不到页面');
}