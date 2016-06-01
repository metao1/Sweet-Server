/**
 * Created by metao on 5/27/2016.
 */
angular.module('SweetApp')
    .controller("SuiteCtrl", function ($scope, $location, SweetService) {
        var id = $location.path().split('/suite/')[1];
        if (id && id >= 0) {
            $scope.suite = {};
            SweetService.getSuiteById({id: id}).success(function (data) {
                $scope.suite = data;
                $scope.mainImage = data.thumbnails[0].url;
            });
        }
        $scope.changeImage = function (id) {
            if ($scope.mainImage) {
                if ($scope.suite.thumbnails[id]) {
                    $scope.mainImage = $scope.suite.thumbnails[id].url;
                }
            }
        };

        $scope.commentClick = function (id) {
            $scope.suite.showComment = !$scope.suite.showComment;
        };

        $scope.submitComment = function () {
            if (!$scope.comment) {
                //$timeout(caller, 4000);
                return $scope.error = " comment value";
            }
            $scope.submitted = true;
            var commentVar = {"value": $scope.comment};
            var commentRequest = {
                "id": id,
                "value": commentVar.value
            };

            console.log(commentRequest);
            SweetService.comment(commentRequest).success(function (data) {
                if (data) {
                    $scope.suite.comments = data.comments;
                    $scope.comment = "";
                    $scope.message = "Thanks for your message for " + $scope.suite.DisplayName + " !";
                    $scope.suite.show = false;
                    //$timeout(caller, 4000);
                }
            });
        };
    }
);