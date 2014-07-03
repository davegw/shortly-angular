

angular.module('shortly.links', ['shortly.links.directives', 'shortly.link.controller'])


.controller('LinksController', function ($scope, Links, $location) {
  // Your code here
  // $location.path('/shorten')
  $scope.data = {};
  $scope.getLinks = function(){
    Links.get()
      .then(function(response) {
        $scope.data.links = response.data;
      });
  };
  $scope.addVisit = function(link){
    // link.visits++;
    Links.addVisit(link.code)
      .then(function(data){
      });
    // console.log(link)
  };
  $scope.goToLink = function(code){
      $location.path('/links/' + code)
  }

  $scope.myData = [
      {name: 'AngularJS', count: 300},
      {name: 'D3.JS', count: 150},
      {name: 'jQuery', count: 400},
      {name: 'Backbone.js', count: 300},
      {name: 'Ember.js', count: 100}
  ];

  $scope.getLinks();
})
