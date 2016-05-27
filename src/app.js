/**
 * Created by metao on 5/19/2016.
 */
angular.module('SweetApp', ['ngResource', 'ngMessages', 'ui.router', 'ngRoute'])
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './partials/card.html',
                controller: 'SweetCtrl'/*,
                 resolve: {
                 authenticated: function ($q, $location, $auth) {
                 var deferred = $q.defer();
                 if (!$auth.isAuthenticated()) {
                 $location.path('/login');
                 } else {

                 deferred.resolve();
                 }
                 return deferred.promise;
                 }
                 }*/
            })
            .state('suite', {
                url: '/suite/:id',
                templateUrl: './partials/suite.html'
            });
        $urlRouterProvider.otherwise('/');
    });
