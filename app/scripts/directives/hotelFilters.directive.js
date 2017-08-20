app.directive('hotelFilters', [function() {
    return {
        restrict: 'E',
        scope: {
            hotels: '=',
            hotelsCache: '='
        },
        templateUrl: '../views/hotel-filters.html',
        controller: ['$scope', '$filter', function hotelCardCtrl($scope, $filter) {
            var lastSearchTerm = 'a';

            $scope.applyFilters = function(searchTerm) {
                var filteredHotels = [];

                filterHotelsByStars();
                searchHotelByName(searchTerm);
            }

           var searchHotelByName = function(searchTerm) {
                lastSearchTerm = searchTerm !== undefined ? searchTerm : lastSearchTerm;

                // $scope.hotels = $filter('filter')($scope.hotelsCache, { name: lastSearchTerm });
                return $filter('filter')($scope.hotelsCache, { name: lastSearchTerm });
            }

            $scope.stars = {all: true, five: false, four: false, three: false, two: false, one: false};

            var filterHotelsByStars = function() {
                var starsArr = [];

                if ($scope.stars.all) {
                    starsArr = [5,4,3,2,1];
                } else {
                    var starsMap = {five: 5, four: 4, three: 3, two: 2, one: 1};
                    for (var checkbox in $scope.stars) {
                        if ($scope.stars[checkbox]) {
                            starsArr.push(starsMap[checkbox]);
                        } 
                    }
                }

                // $scope.hotels = $filter('byStars')($scope.hotelsCache, starsArr);
                return $filter('filter')($scope.hotelsCache, { name: lastSearchTerm });
            }


            $( function() {
                $( "#slider-range" ).slider({
                    range: true,
                    min: 0,
                    max: 500,
                    values: [ 75, 300 ],
                    slide: function( event, ui ) {
                    $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                    }
                });
                $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
                    " - $" + $( "#slider-range" ).slider( "values", 1 ) );
            } );

            $scope.$watchCollection('stars', function (checkboxVal, oldCheckboxVal) {
                console.log(checkboxVal);
                if (checkboxVal.all && !oldCheckboxVal.all) {
                    $scope.stars.all = true;
                    $scope.stars.five = false;
                    $scope.stars.four = false;
                    $scope.stars.three = false;
                    $scope.stars.two = false;
                    $scope.stars.one = false;
                } else {
                    console.log('test');
                    if (!checkboxVal.five && !checkboxVal.four && !checkboxVal.three && !checkboxVal.two && !checkboxVal.one) {
                        $scope.stars.all = true;
                    } else if (checkboxVal.five || checkboxVal.four || checkboxVal.three || checkboxVal.two || checkboxVal.one) {
                        $scope.stars.all = false;
                    }
                }
            });

            // $scope.manageStarCheckboxes = function(allStars) {
            //     console.log("change");
            //     if (allStars) {
            //         $scope.stars.all = true;
            //         $scope.stars.five = false;
            //         $scope.stars.four = false;
            //         $scope.stars.three = false;
            //         $scope.stars.two = false;
            //         $scope.stars.one = false;
            //     } else {
            //         if (!$scope.stars.five && !$scope.stars.four && !$scope.stars.three && !$scope.stars.two && !$scope.stars.one) {
            //             $scope.stars.all = true;
            //         } else if ($scope.stars.five || $scope.stars.four || $scope.stars.three || $scope.stars.two || $scope.stars.one) {
            //             $scope.stars.all = false;
            //         }
            //     }
            // }

        }]
      };
}]);