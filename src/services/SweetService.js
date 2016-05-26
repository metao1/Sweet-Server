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
                return $http.get("/allsweets");
            },
            voteUp: function (q) {
                return $http.post("/voteup", q);
            },
            voteDown: function (q) {
                return $http.post("/votedown", q);
            },
            comment: function (q) {
                return $http.post("/comment", q);
            }
        };
    });
