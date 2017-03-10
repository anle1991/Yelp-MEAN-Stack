/**
 * Define module
 */
angular
    .module('loc8rApp', ['ngRoute']);
//     .controller('locationListCtrl', locationListCtrl)
//     .filter('formatDistance', formatDistance)
//     .directive('ratingStars', ratingStars)
//     .service('loc8rData', loc8rData)
//     .service('geolocation', geolocation);
//
// /**
//  * CONTROLLER: Use to control a part of HTML and get scope form binding vars
//  */
// var locationListCtrl = function($scope, loc8rData, geolocation){
//     $scope.message = "Checking your location";
//
//     // Func to run if geolocation is successful
//     $scope.getData = function(position){
//         var lat = position.coords.latitude,
//             lng = position.coords.longitude;
//         $scope.message = "Searching for nearby places";
//         loc8rData.locationByCoords(lat,lng)
//             .success(function(data){
//                 console.log('Current location: lat ' + lat + ', lng ' +lng);
//                 $scope.message = data.length > 0 ? "" : "No locations found";
//                 $scope.data = {locations:data};
//             })
//             .error(function(e){
//                 $scope.message = "Sorry, something's gone wrong";
//                 console.log(e);
//             });
//     };
//
//     $scope.showError = function(error){
//         $scope.$apply(function(){
//             $scope.message = error.message;
//         });
//     };
//
//     $scope.noGeo = function(){
//         $scope.$apply(function(){
//             $scope.message = "Geolocation not supported by this browser";
//         });
//     };
//
//     geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
// };
//
// /**
//  * FILTER: Use as bar | in view
//  */
// var formatDistance = function(){
//     return function(distance){
//         var numDistance, unit;
//         if(distance && _isNumeric(distance)){
//             if(distance > 1){
//                 numDistance = parseFloat(distance).toFixed(1);
//                 unit = ' km';
//             }else{
//                 numDistance = parseInt(distance * 1000, 10);
//                 unit = ' m';
//             }
//             return numDistance + unit;
//         } else {
//             return "?";
//         }
//     };
// };
//
// var _isNumeric = function(n){
//     return !isNaN(parseFloat(n)) && isFinite(n);
// }
//
// /**
//  * CUSTOM DIRECTIVE: Use as <div raitng-stars></div> HTML ignores caseSensitive
//  * Define scope var
//  * https://docs.angularjs.org/guide/directive
//  */
// var ratingStars = function(){
//     return {
//         scope : {
//             thisRating : " =rating"
//         },
//         templateUrl : '/angular/rating-stars.html'
//     };
// };
//
// /**
//  * SERVICE: used in controller
//  * @param $http
//  * @returns {*}
//  */
// var loc8rData = function($http){
//     var locationByCoords = function (lat,lng) {
//         return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=99999999999999999999999');
//     };
//
//     return {
//         locationByCoords : locationByCoords
//     };
// };
//
// /**
//  * SERVICE: used in controller
//  * @returns {{getPosition: getPosition}}
//  */
// var geolocation = function () {
//     var getPosition = function (cbSuccess, cbError, cbNoGeo) {
//         if(navigator.geolocation){
//             navigator.geolocation.getCurrentPosition(cbSuccess,cbError);
//         }else{
//             cbNoGeo();
//         }
//     };
//
//     return{
//         getPosition : getPosition
//     };
// };

