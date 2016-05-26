/**
 * Created by metao on 5/19/2016.
 */
angular.module('SweetApp', ['ngResource', 'ngMessages', 'ui.router', 'ngRoute'])
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './partials/sweet.html',
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
            });
        $urlRouterProvider.otherwise('/');
    });
