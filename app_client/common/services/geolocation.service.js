/**
 * Created by anle on 6/5/16.
 */
(function(){
    angular
        .module('loc8rApp')
        .service('geolocation', geolocation);

    /**
     * SERVICE: used in controller
     * @returns {{getPosition: getPosition}}
     */
    function geolocation(){
        var getPosition = function (cbSuccess, cbError, cbNoGeo) {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(cbSuccess,cbError);
            }else{
                cbNoGeo();
            }
        };

        return{
            getPosition : getPosition
        };
    }
})();