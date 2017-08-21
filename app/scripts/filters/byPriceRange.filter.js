app.filter('byPriceRange', function() {
    return function(hotels, minMax) {
        var filtered = [],
            min = minMax[0],
            max = minMax[1];

        hotels.forEach(function(hotel) {
            if (hotel.price >= min && hotel.price <= max) {
                filtered.push(hotel);
            }
        });

        return filtered;
    };
})