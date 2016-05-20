/**
 * Created by metao on 5/19/2016.
 */
angular.module('SweetApp')
    .controller('BoardCtrl', function ($scope) {
        $scope.cards = [{
            card: "card3",
            desc: "description",
            sc: [{
                path: 'http://cafeswitt.ir/UserStaticData/d08082a2-fd13-4267-b504-1d46ca2d8c67e882e9c5b07d/0_01csm4hk.f55.jpg'
            }, {
                path: 'http://cafeswitt.ir/UserStaticData/fc119e52-d186-46ae-962a-c6064517f924a8c3a9dc313d/0_hoaoxmna.p5u.jpg'
            }]
        }];

    });
