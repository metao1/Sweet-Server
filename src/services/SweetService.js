/**
 * Created by metao on 5/21/2016.
 */
angular.module('SweetApp')
    .factory("SweetService", function ($http) {
        return {
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
                console.log(q);
                return $http.post("/comment", q);
            },
            getSuiteById: function (q) {
                return $http.get("/suite/" + q.id);
            }
        };
    });
