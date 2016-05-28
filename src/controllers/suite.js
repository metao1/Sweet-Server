/**
 * Created by metao on 5/27/2016.
 */
angular.module('SweetApp')
    .controller("PopupCtrl", function ($scope, $location, SweetService) {
        var id = $location.path().split('/suite/')[1];
        if (id && id >= 0) {
            $scope.suite = {};
            SweetService.getSuiteById({id: id}).success(function (data) {
                $scope.suite = data;
            });
        }
    });