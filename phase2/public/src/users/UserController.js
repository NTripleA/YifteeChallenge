var app = angular.module("users")
    .controller('UserController',['yifteeService','$mdSidenav','$mdBottomSheet', '$timeout', '$log', '$scope', '$mdDialog', '$location', '$q', '$route', function(yifteeService, $mdSidenav, $mdBottomSheet, $timeout, $log, $scope, $mdDialog, $location, $q, $route)
    {

    var self = this;

    $scope.user = {'name': "",
                    'email': ""};
    $scope.recipient = {'name': "",
                        'sms': "",
                        'email': "",
                        'message': ""};

    $scope.sms = false;
    $scope.email = false;

    $scope.validateEmail = function(input){

        if(input.length === 0){
            $scope.email = false;
            return false;
        }

        else if(input.length > 1){

            var split = input.split('@');

            if(split.length <= 1){
                $scope.email = false;
                return false;
            }

            else{

                var rec = split[0];
                var domain = split[1];

                if(rec.length < 1 || domain.length < 1){
                    $scope.email = false;
                    return false;
                }

                else{
                    $scope.email = true;
                    return true;
                }

            }


        }

    }


    $scope.evaluateSMS = function(input){

        if(input.substring(0,1) === '1'){

            if(input.length === 11 || input.length === 0){
                if(input.length === 11){
                    $scope.sms = true;
                }
                return true;
            }

            else{
                $scope.sms = false;
                return false;
                }

        }

        else{

            if(input.length === 10 || input.length === 0){
                if(input.length === 10){
                    $scope.sms = true;
                }
                return true;

            }

            else{
                $scope.sms = false;
                return false;
            }
        }

    }


    self.users = [];
    self.names = [];
    self.sms = [];
    self.s = [];

    self.nameSearch = function(input){

        console.log(input);
        yifteeService.getUsers(input)
            .then(function(response){

                self.users = response.contacts;

            });

        self.names = loadNames();

        var results = query ? self.names.filter( createFilterFor(input) ) : self.names;
        var deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;

    }

    function loadNames(){

        var names = self.users.map(function (user){

            return user.name;
        })

        return names;

    }



    self.smsSearch = function(input){

            console.log(input);
            yifteeService.getUsers(input)
                .then(function(response){

                    self.users = response.contacts;

                });

            self.sms = loadSMS();

            var results = query ? self.sms.filter( createFilterFor(input) ) : self.sms;
            var deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;

        }

        function loadSMS(){

            var phones = self.users.map(function (user){

                return user.phone;
            })

            return phones;

        }

     self.Search = function(input){

                console.log(input);
                yifteeService.getUsers(input)
                    .then(function(response){

                        self.users = response.contacts;

                    });

                self.emails = loadEmails();

                var results = query ? self.emails.filter( createFilterFor(input) ) : self.emails;
                var deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;

            }

            function loadSMS(){

                var emails = self.users.map(function (user){

                    return user.email;
                })

                return emails;

            }


        function createFilterFor(query) {
                 var lowercaseQuery = angular.lowercase(query);

                 return function filterFn(state) {
                   return (state.value.indexOf(lowercaseQuery) === 0);
                 };

               }


        $scope.validate = function (){


            if($scope.sms === true && $scope.recipient.name.length > 1 && $scope.recipient.message.length > 1 && $scope.user.email.length > 1){

                return true;

            }

            else if($scope.email === true && $scope.recipient.name.length > 1 && $scope.recipient.message.length > 1 && $scope.user.email.length > 1){

                return true;


            }

            else
                return false;

        }


  }])
  .config(function($mdThemingProvider) {

      // Configure a dark theme with primary foreground yellow

      $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

    });;
