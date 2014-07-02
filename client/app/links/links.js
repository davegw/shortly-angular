angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here

  $scope.data = {};
  $scope.getLinks = function(){
    Links.get().then(function(response) {
      console.log(response.data);
      $scope.data.links = response.data;
    });
  };

  $scope.getLinks();
});

