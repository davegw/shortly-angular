angular.module('shortly.links', ['shortly.links.directives', 'shortly.link.controller'])

.controller('LinksController', function ($scope, Links, $location) {
  // Your code here
  $scope.data = {};

  $scope.getLinks = function(){
    Links.get()
      .then(function(response) {
        $scope.data.links = response.data;
      });
  };

  // Update the DOM and broadcast event to child controller.
  $scope.addVisit = function(link){
    link.visitCount++;
    $scope.$broadcast('addVisit', link);
  };

  $scope.goToLink = function(code){
      $location.path('/links/' + code)
  };

  $scope.getLinks();
})
