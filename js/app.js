var sliderApp = angular.module('sliderApp', ['ngAnimate']);

sliderApp.controller('SliderController', function($scope, $http) {

    $http.get("info_box.json").success(function(data) {
        $scope.images = data;
        console.log(data);
    });

    
     
  $scope.selectedIndex = 0;
  
  $scope.itemClicked = function ($index) {
    console.log($index);
    $scope.selectedIndex = $index;
  };
});

sliderApp.directive('slider', function($timeout) {

    return {
        restrict: 'AE',
        replace: false,
        transclude: true,
        scope: {
            images: '='
            
            
        },
        link: function(scope, elem, attrs) {

            scope.currentIndex = 0;

            scope.next = function() {
                scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
            };

            scope.prev = function() {
                scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
            };

            scope.$watch('currentIndex', function() {
                scope.images.forEach(function(image) {
                    image.visible = false;
                });
                scope.images[scope.currentIndex].visible = true;
            });

  

//            scope.$on('$destroy', function() {
//                $timeout.cancel(timer);
//            });    

        },
        templateUrl: 'templates/templateurl.html'
    };
});