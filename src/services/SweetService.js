/**
 * Created by metao on 5/21/2016.
 */
angular.module('SweetApp')
    .factory("SweetService", function ($http) {
        return {
            vote: function (query) {
                return $http.post("/vote", query);
            },
            allVotes: function () {
                return $http.get("/all");
            },
            voteUp: function (q) {
                return $http.post("/vote_up", q);
            },
            voteDown: function (q) {
                return $http.post("/vote_down", q);
            },
            comment: function (q) {
                return $http.post("/comment", q);
            },
            getSuiteById: function (q) {
                return $http.post("/get_suite_by_id", q);
            }
        };
    });
