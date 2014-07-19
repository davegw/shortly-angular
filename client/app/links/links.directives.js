angular.module('shortly.links.directives', [])

.directive('linker', function($location){
  return {
    restrict: 'A',
    // require: '^ngModel',
    template: [
      '<div>',
        '{{link.title}} ',
      '</div>',
      '<a ng-click="addVisit(link)" href="{{link.base_url}}/api/links/{{link.code}}">{{link.base_url}}/{{link.code}} </a>',
      '<span class="label label-primary pull-right">',
        '{{link.visitCount}}',
      '</span>'].join(''),
    link: function(scope, element, attrs){
      element.click(function(){
        $('.list-group-item').removeClass('active');
        element.addClass('active');
      });
    }
  };
})
