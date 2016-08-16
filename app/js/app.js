/*
 * 功能: 初始化app, 并进行配置
 */
console.log("欢迎使用Meloduet Bilibili Video Fetcher!");
//Web应用程序设置
    var app = angular.module('appMbvf', ['ngRoute']);
    
    app.config(
        function($routeProvider) {
            $routeProvider.
            when('/home', {
                templateUrl: './template/home.html',
                controller: 'HomeController'
            }).
            when('/about', {
                templateUrl: './template/about.html',
                controller: 'AboutController'
            }).
            when('/video/:aid', {
                templateUrl: './template/video.html',
                controller: 'VideoController'
            }).
            when('/video_batch/:av', {
                templateUrl: './template/video_batch.html',
                controller: 'VideoBatchController'
            }).
            when('/404.html', {
                templateUrl: './template/404.html',
                controller: 'NotFoundController'
            }).otherwise({
                redirectTo: '/home'
            });
            
        });
        
    