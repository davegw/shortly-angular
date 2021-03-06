angular.module('shortly', [
  'ngSanitize',
  'ngAnimate',
  'ui.router',
  'fx.animations',
  'angularCharts',
  'shortly.services',
  'shortly.links',
  'shortly.shorten',
  'shortly.auth',
  'ngRoute'
])

.config(function($stateProvider, $httpProvider) {
  $stateProvider
    .state("index", {
      url : "/",
      templateUrl: "/app/auth/signin.html",
      controller: "AuthController"
    })
    .state("signin", {
      url : "/signin",
      templateUrl: "/app/auth/signin.html",
      controller: "AuthController"
    })
    .state("signup", {
      url : "/signup",
      templateUrl: "/app/auth/signup.html",
      controller: "AuthController"
    })

    .state("links", {
      url: "/links",
      templateUrl: 'app/links/links.html',
      controller: 'LinksController'
    })
    .state("links.detail", {
      url: "/:code",
      templateUrl: 'app/links/links.detail.html',
      controller: 'LinkController'
    })


    .state("shorten", {
      url: "/shorten",
      templateUrl: 'app/shorten/shorten.html',
      controller: 'ShortenController'
    });
  $stateProvider.state("otherwise", {
      url: "*path",
      templateUrl: "views/auth/signin.html",
      controller: "AuthController"
  });
  
  $httpProvider.interceptors.push('AttatchTokens');
})

.factory('AttatchTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route.controller && next.$$route.controller !== 'AuthController') {
      Auth.isAuth()
        .then(function () {
          console.log('Good to go in!');
        })
        .catch(function () {
          $location.path('/signin');
        });
    }
  });
});
