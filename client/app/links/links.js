

angular.module('shortly.links', [])

.directive('linker', function(){
  return {
    restrict: 'E',
    // require: '^ngModel',
    template: ['<div>{{link.title}} </div>',
      '<a ng-click="addVisit(link)" href="{{link.base_url}}/api/links/{{link.code}}">{{link.base_url}}/{{link.code}} </a>',
      '<span class="label label-primary pull-right">',
        '{{link.visits}}',
      '</span>'].join('')

  };
})


.controller('LinksController', function ($scope, Links) {
  // Your code here
  $scope.data = {};
  $scope.getLinks = function(){
    Links.get()
      .then(function(response) {
        $scope.data.links = response.data;
      });
  };
  $scope.addVisit = function(link){
    link.visits++;
  };


  $scope.getLinks();
});
