/**
 * Created by metao on 5/19/2016.
 */
angular.module('SweetApp', ['ngResource', 'ngMessages', 'ui.router', 'ngRoute', 'pascalprecht.translate'])
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider, $translateProvider) {
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
        $translateProvider.translations('fa_IR', {
            "CONTACT_US": "تماس با ما",
            "SIGN_IN": "ورود",
            "SIGN_OUT": "خروج",
            "ABOUT": "درباره ما",
            "JOBS": "همکاری با ما",
            "SIGN_UP": "ثبت نام",
            "EMAIL": "ایمیل",
            "APP_NAME": "مرکز اجاره سوییت",
            "order" : "سفارش",
            "PASSWORD": "پسورد",
            "CONFIRM_PASSWORD": "تایید پسورد",
            "LOGIN": "ورود",
            "FORGOT_PASS": "پسورد خود را فراموش کردید؟",
            "DONT_HAVE_ACCOUNT": "هنوز اکانت ندارید؟",
            "ENTER_YOUR_NAME": "باید نام خود را وارد کنید",
            "ENTER_YOUR_EMAIL": "ایمیل اجباری است",
            "USER_NOT_FOUND": "کاربر پیدا نشد",
            'WRONG_EMAIL_OR_PASSWORD': 'ایمیل یا رمز نادرست است',
            "SUCCESS_LOGIN": "با موفقیت وارد شدید",
            "INVALID_PASSWORD": "پسورد را وارد کنید",
            "NAME": "نام",
            "EXTEND": "بیشتر کردن",
            "PASSWORD_MUST_MATCH": "دو پسورد باید یکی باشند",
            "INVALID_EMAIL": "ساختار ایمیل اشتباه است",
            "PRIVACY_PART1": "با کلیک بر روی ثبت نام موافقت خود را اعلام میکنم با",
            "TERMS_AND_CONDITIONS": "قوانین و مقررات",
            "AND": "و",
            'PRIVACY': "نحوه صحیح استفاده برنامه",
            "HAVE_ACCOUNT": "اکانت دارید؟",
            "PLEASE_LOGIN": "وارد شوید",
            "PLAY": "شروع بازی",
            "SCORE": "تعداد دفعات مجاز به بازی:",
            'PAY': 'پرداختی',
            "FIVE_DOLLAR": "5000",
            "TEN_DOLLAR": "9000",
            "FIFTEEN_DOLLAR": "12000",
            "TWENTY_DOLLAR": "15000",
            "FIVE_DOLLAR_REAL": "7000",
            "TEN_DOLLAR_REAL": "15000",
            "FIFTEEN_DOLLAR_REAL": "17000",
            "TWENTY_DOLLAR_REAL": "20000",
            'FIVE_DOLLAR_NUMBER': '20',
            'TEN_DOLLAR_NUMBER': '50',
            'FIFTEEN_DOLLAR_NUMBER': '70',
            'TWENTY_DOLLAR_NUMBER': '100',
            "BASIC": "اقتصادی",
            "FAVORITE": "محبوب",
            "SPECIAL": "ویژه",
            "VERY": "بلند مدت",
            'PAYMENT': 'افزایش تعداد دفعات بازی',
            'REAL_PRICE': 'قیمت واقعی',
            'SUCCESS_BUY': 'با موفقیت تعداد دفعات بازی شما افزایش پیدا کرد.به صفحه اصلی هدایت میشوید'
            //'SUCCESS_BUY': 'با موفقیت به تعداد دفعات بازی شما اضافه گردید. از بازی لذت ببرید'
        });
        $translateProvider.preferredLanguage('fa_IR');
    });
