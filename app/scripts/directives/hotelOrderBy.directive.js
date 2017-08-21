app.directive('hotelOrderBy', [function() {
    return {
        restrict: 'E',
        scope: {
            hotels: '='
        },
        templateUrl: '../views/hotel-order-by.html',
        controller: ['$scope', '$filter', function hotelCardCtrl($scope, $filter) {
            $scope.orderBySelect = 'masRelevantes';

            var filterValueMap = {
                masRelevantes: {exp: "'recommended'", rev: true},
                menorPrecio: {exp: 'rate.price.per_night', rev: false},
                mayorPrecio: {exp: 'rate.price.per_night', rev: true},
                menosEstrellas: {exp: 'stars', rev: false},
                masEstrellas: {exp: 'stars', rev: true},
            }

            $scope.$watch('orderBySelect', function(newValue, oldValue) {
                $scope.hotels = $filter('orderBy')($scope.hotels, filterValueMap[newValue].exp, filterValueMap[newValue].rev);
            });
        }]
      };
}]);