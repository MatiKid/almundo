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
                var filteredHotels = $scope.hotelsCache;

                filteredHotels = searchHotelByName(filteredHotels, searchTerm);
                filteredHotels = filterHotelsByStars(filteredHotels);
                filteredHotels = filterHotelsByPriceRange(filteredHotels);

                $scope.hotels = filteredHotels;
                console.log($scope.hotels);
            };

           var searchHotelByName = function(hotelsToFilter, searchTerm) {
                lastSearchTerm = searchTerm !== undefined ? searchTerm : lastSearchTerm;

                return $filter('filter')(hotelsToFilter, { name: lastSearchTerm });
            }

            $scope.stars = {all: true, five: false, four: false, three: false, two: false, one: false};

            var filterHotelsByStars = function(hotelsToFilter) {
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

                return $filter('byStars')(hotelsToFilter, starsArr);
            };

            var filterHotelsByPriceRange = function(hotelsToFilter) {
                return $filter('byPriceRange')(hotelsToFilter, sliderValues);
            }

            var getPriceRange = function() {
                var prices = [],
                    range = [];

                $scope.hotels.forEach(function(hotel) {
                    prices.push(hotel.price);
                });

                range[0] = prices.reduce(function(a, b) {
                    return Math.min(a, b);
                });

                range[1] = prices.reduce(function(a, b) {
                    return Math.max(a, b);
                });

                return range;
            }

            var sliderValues;

            $( function() {
                var priceRange = getPriceRange(),
                    range = priceRange;
                sliderValues = priceRange;

                $( "#slider-range" ).slider({
                    range: true,
                    min: range[0],
                    max: range[1],
                    values: range,
                    slide: function( event, ui ) {
                        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                    },
                    change: function( event, ui ) {
                        sliderValues[ui.handleIndex] = ui.value;
                        $scope.applyFilters();
                    }
                });
                $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
                    " - $" + $( "#slider-range" ).slider( "values", 1 ) );
            } );


            $scope.$watchCollection('stars', function(checkboxVal, oldCheckboxVal) {
                if (checkboxVal.all && !oldCheckboxVal.all) {
                    $scope.stars.all = true;
                    $scope.stars.five = false;
                    $scope.stars.four = false;
                    $scope.stars.three = false;
                    $scope.stars.two = false;
                    $scope.stars.one = false;
                } else {
                    if (!checkboxVal.five && !checkboxVal.four && !checkboxVal.three && !checkboxVal.two && !checkboxVal.one) {
                        $scope.stars.all = true;
                    } else if (checkboxVal.five || checkboxVal.four || checkboxVal.three || checkboxVal.two || checkboxVal.one) {
                        $scope.stars.all = false;
                    }
                }
            });

        }]
      };
}]);