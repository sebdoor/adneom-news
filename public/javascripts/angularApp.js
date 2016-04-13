'use strict';

var app = angular.module('adneomNews',['ui.router']);

// Injection du service posts
app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts) {
        $scope.test = "Hello World !";
        $scope.posts = posts.posts;
        
        // Create a new post
        $scope.addPost = function() {
            if(!$scope.title || $scope.title === '')
                return;
            else {
                $scope.posts.push({
                    'title'   : $scope.title, 
                    'link'    : $scope.link, // on crée une var link si elle n'existe pas
                    'upvotes' : 0,
                    'comments' : [
                        {author : 'Joe', body : 'Cool post !', upvotes : 0},
                        {author : 'Howard', body : 'I like to comment, héhé... !', upvotes : 0}
                    ]
                });
                $scope.title = '';
            }
        };
        
        // Increment upvote of the current instance of post
        $scope.incrementUpvote = function(post) {
            ++post.upvotes;
        };
        
}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', 
    function($scope, $stateParams, posts) {
        // Using stateParams to retrieve the id
        $scope.post = posts.posts[$stateParams.id]; 
        $scope.addComment = function() {
            if($scope.body === '') { return; }  
            $scope.post.comments.push({ // Accolade because of the object
                body : $scope.body,
                author : 'user',
                upvotes : 0
            });
            $scope.body = '';
        };
        
        $scope.incrementUpvotesComment = function(post, comment) {
            ++comment.upvotes;
        };
    }
]);

// Create a service for reusability of the posts in other modules that injects the posts service
app.factory('posts',[function() {
        var o = {
            posts: []
        };
        return o;
}]);


// routes configuration
app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('home', { // Create a new state
                    url: '/home',
                    templateUrl: '/home.html', // Assign the script block of id="/home.html"
                    controller: 'MainCtrl' // Assign a controller to our state
                })
                .state('posts', {
                    url: '/posts/{id}',
                    templateUrl: '/posts.html',
                    controller: 'PostsCtrl'
                });
        // if the url is not defined
        $urlRouterProvider.otherwise('home');
    }
]);

