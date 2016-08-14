'use strict'

app.controller("MainCtrl", MainCtrl);
app.controller("HomeController", HomeController);
app.controller("AboutController", AboutController);
app.controller("VideoController", VideoController);
app.controller("NotFoundController", NotFoundController);

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
        window.location.href = "#/video/"+aid;
    }
}

function AboutController($scope, Page) {
    Page.setTitle('关于')
    Page.setIndex(1);
}

function VideoController($scope, Page, $routeParams) {

    Page.setIndex(-1);
    $scope.title = "加载中...";
    $scope.videoInfo = new VideoInfo();
    log("VideoController.aid", $routeParams.aid)
    getVideoInfo($routeParams.aid, function(vi) {
            var vi = $.extend(new VideoInfo(), vi)
            log("VideoController", vi.title);
            $scope.$apply(function() {
                $scope.title = vi.title;
                Page.setTitle("BiliBili " + vi.title + " 视频下载页面");
                $scope.videoInfo = vi;
            })
            getVideoAllFormat($scope.videoInfo.cid,
                function(data) {
                    console.log(data);
                    $scope.$apply(function() {
                        $scope.play=data.durl[0];
                        $scope.bak1=$scope.play.backup_url[0];
                        $scope.bak2=$scope.play.backup_url[1];
                    })
                },
                function() {
                    $scope.$apply(function() {
                        console.log("failed");
                    })
                });

        },
        function() {
            window.location.href = "#/404.html";
        });

}

function NotFoundController($scope, Page) {
    Page.setIndex(-1);
    Page.setTitle('404 找不到页面');
}