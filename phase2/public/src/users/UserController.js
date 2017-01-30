var app = angular.module("users")
    .controller('UserController',['$mdSidenav','$mdBottomSheet', '$timeout', '$log', '$scope', '$mdDialog', '$location', '$q', 'yifteeService', function($mdSidenav, $mdBottomSheet, $timeout, $log, $scope, $mdDialog, $location, $q, yifteeService)
    {

    var self = this;

    $scope.tempUser = {'name': "",
                    'email': ""};
    $scope.tempRecipient = {'name': "",
                        'sms': "",
                        'email': "",
                        'message': ""};

    $scope.user = $scope.tempUser;
    $scope.recipient = $scope.tempRecipient;

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
    self.simulateQuery = false;

    self.nameSearch = function(input){

        console.log(input);
        yifteeService.getUsers(input).then(function(response){

                self.users = response.response.contacts;

            });

        self.names = loadNames();
        console.log(self.names);
        var results = input ? self.names.filter( createFilterFor(input) ) : self.names, deferred;

         if (self.simulateQuery){
            deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;}

        else
            return results;

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

                    self.users = response.response.contacts;

                });

            self.sms = loadSMS();

            var results = input ? self.sms.filter( createFilterFor(input) ) : self.sms, deferred;

           if (self.simulateQuery){
               deferred = $q.defer();
               $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
               return deferred.promise;}

           else
               return results;

        }

        function loadSMS(){

            var phones = self.users.map(function (user){

                return user.phone;
            })

            return phones;

        }

     self.emailSearch = function(input){

                console.log(input);
                yifteeService.getUsers(input)
                    .then(function(response){

                        self.users = response.response.contacts;

                    });

                self.emails = loadEmails();

                var results = input ? self.emails.filter( createFilterFor(input) ) : self.emails;

                if (self.simulateQuery){
                            deferred = $q.defer();
                            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                            return deferred.promise;}

                        else
                            return results;

            }

            function loadEmails(){

                var emails = self.users.map(function (user){

                    return user.email;
                })

                return emails;

            }


        function createFilterFor(query) {
                 var lowercaseQuery = angular.lowercase(query);

                 return function filterFn(state) {
                   return (state.value.indexOf(lowercaseQuery) != -1);
                 };

               }


        $scope.validate = function (){

//            console.log("sms: "+$scope.sms);
//            console.log("email: "+$scope.email);
//            console.log($scope.recipient);
//            console.log($scope.user);

            if($scope.sms === true && $scope.recipient.name.length > 1 && $scope.recipient.message.length >= 1 && $scope.user.email.length > 1){

                return true;

            }

            else if($scope.email === true && $scope.recipient.name.length > 1 && $scope.recipient.message.length > 1 && $scope.user.email.length > 1){

                return true;


            }

            else
                return false;

        }

        $scope.saveName = function(param){

            $scope.recipient.name = param;
        }

        $scope.savePhone = function(param){

            $scope.recipient.phone = param;
        }

        $scope.saveEmail = function(param){

            $scope.recipient.email = param;
        }

        $scope.saveMessage = function(param){

            $scope.recipient.message = param;
        }


        $scope.success = function(){

            swal(
                        'Sent',
                        'Message was sent',
                        'success'
                      );

        }


  }])
  .config(function($mdThemingProvider) {

      // Configure a dark theme with primary foreground yellow

      $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

    });;
