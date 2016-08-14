console.log("欢迎使用Meloduet Bilibili Video Fetcher!");
//Web应用程序设置
    var app = angular.module('appMbvf', ['ngRoute']);
    
    app.config(
        function($routeProvider) { //One typo here
            $routeProvider.
            when('/home.html', {
                templateUrl: './template/home.html',
                controller: 'HomeController'
            }).
            when('/about.html', {
                templateUrl: './template/about.html',
                controller: 'AboutController'
            }).
            when('/video/:aid', {
                templateUrl: './template/video.html',
                controller: 'VideoController'
            }).
            when('/404.html', {
                templateUrl: './template/404.html',
                controller: 'NotFoundController'
            }).otherwise({
                redirectTo: '/home.html'
            });
            
        });
        
    