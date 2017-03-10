/**
 * Created by anle on 6/5/16.
 * Separated services
 */


(function(){
    angular
        .module('loc8rApp')
        .service('loc8rData', loc8rData);

    /**
     * SERVICE: used in controller
     * @param $http
     * @returns {*}
     */
    loc8rData.$inject = ['$http'];
    function loc8rData($http){
        var locationByCoords = function (lat,lng) {
            return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=99999999999999999999999');
        };

        var locationById = function (locationid){
            return $http.get('/api/locations/' + locationid);
        };

        return {
            locationByCoords : locationByCoords,
            locationById : locationById
        };
    };
})();