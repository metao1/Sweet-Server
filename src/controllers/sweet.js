/**
 * Created by metao on 5/19/2016.
 */
angular.module('SweetApp')
    .controller("SweetCtrl", function ($scope, $timeout, SweetService) {
        $scope.cards = [];
        var ideaArray = [];

        SweetService.allVotes().success(function (data) {
            $scope.cards = [];
            ideaArray = data.suites;
            ideaArray.forEach(function (a, index) {
                ideaArray[index].visible = 'false';
            });
            $scope.cards = ideaArray;
        });

        $scope.submitIdea = function () {
            if (!$scope.nameValue) {
                $timeout(caller, 4000);
                return $scope.error = " name";
            }
            if (!$scope.mindValue) {
                $timeout(caller, 4000);
                return $scope.error = " idea to show";
            }
            $scope.error = "";
            var data = {
                DisplayName: $scope.nameValue,
                Idea: $scope.mindValue
            };
            SweetService.vote(data).success(function (res) {
                ideaArray.push(res);
            });
            $scope.nameValue = "";
            $scope.mindValue = "";
        };

        $scope.voteClick = function (id, value) {
            if (value > 0) {
                SweetService.voteUp({id: id}).success(function (data) {
                    if (data) {
                        ideaArray[id].vote_up = data.vote_up;
                        ideaArray[id].average_rate = data.average_rate;
                        /*    ideaArray[id].VoteDown.disabled = true;
                         ideaArray[id].VoteUp.disabled = true;*/
                        $scope.message = "Thanks for your feed back! Your feedback saved for this person. " +
                        "\nYou can only vote once for " + ideaArray[id].DisplayName;
                        $timeout(caller, 4000);
                    }
                });
            } else {
                SweetService.voteDown({id: id}).success(function (data) {
                    if (data) {
                        ideaArray[id].vote_down = data.vote_down;
                        ideaArray[id].average_rate = data.average_rate;
                        /*ideaArray[id].VoteDown.disabled = true;
                         ideaArray[id].VoteUp.disabled = true;*/
                        $scope.message = "Thanks for your feed back! Your feedback saved for this person. " +
                        "\nYou can only vote once for " + ideaArray[id].DisplayName;
                        $timeout(caller, 4000);
                    }
                });
            }
        };

        $scope.commentClick = function (id) {
            ideaArray[id].showComment = !ideaArray[id].showComment;
        };

        $scope.submitComment = function (id) {
            if (!$scope.comment) {
                $timeout(caller, 4000);
                return $scope.error = " comment value";
            }
            var commentVar = {"value": $scope.comment};
            var commentRequest = {
                "id": id,
                "value": commentVar.value
            };
            SweetService.comment(commentRequest).success(function (data) {
                ideaArray[id].comments.push(commentVar);
                $scope.comment = "";
                $scope.message = "Thanks for your message for " + ideaArray[id].DisplayName + " !";
                ideaArray[id].show = false;
                $timeout(caller, 4000);
            });
        };

        function caller() {
            $scope.message = "";
            $scope.error = "";
        }
    });