/**
 * Created by elanastroud on 9/3/14.
 */

var num = 1;

(function () {

    var app = angular.module("questionPageApp", ['ngRoute']);
    app.controller('questionPageController', ['$window', '$scope', '$http', '$timeout', '$route', function ($window, $scope, $http, $timeout, $route) {

//        this.questions = {question: 'question1'}

        $scope.questions = {pool:[{q:'Was the equipment you checked out the right tool for the job?', type:0, a:[]},
            {q:' For what purpose(s) will you use the DMC equipment?', type:1, a:[]}]};

//        var ran = (Math.random() * 1).toFixed(0)


//        $scope.q = $scope.questions.pool[ran];
//
        $scope.yesno = '';
        $scope.inout = '';

        $scope.firstQuestion = true;


        $scope.answers = ['Student group', 'Self-promotion', 'Academic', 'Personal learning',
                            'Community service', 'Entertainment relaxation', 'Campus community'];

        $scope.answersChecked = [0,0,0,0,0,0,0]

        $scope.continue = function() {
            $scope.firstQuestion = false;
            if($scope.inout == 'in') {
                $scope.q = $scope.questions.pool[0];;
            } else {
                $scope.q = $scope.questions.pool[1];;
            }
            console.log("pressed continue");
        }

        $scope.submit = function() {
            console.log("button clicked!");
            if ($scope.q.type == 0) {
//                   console.log($scope.yesno);
                $scope.q.a.push($scope.yesno);
            } else if ($scope.q.type == 1) {
                for (var x = 0; x < $scope.answersChecked.length; x++) {
                    if ($scope.answersChecked[x] == true) {
                        $scope.q.a.push($scope.answers[x]);
                    }
                }
            }
            console.log("am i prinitng?");
            console.log($scope.q);
                $http.post('/testPost', $scope.q).success(function() {
                    console.log("I am posting!")

                }).error(function() {
                    console.log("I failed to post, caused an error");
                });

            $scope.startFadeout = true;
            setTimeout(function(){
                $scope.hidden = true;
                $window.location.reload();

//                $scope.startFadeout = false;
//
//                $scope.startFadein = true;
            }, 4000);

//            $scope.startFadein = true;
//            setTimeout(function() {
//                $scope.hidden = false;
//                $scope.startFadein = false;
//            }, 2000);



//            setTimeout(function(){
//                $scope.startFade = true;
//            }, 2000);

//            $(".response-container").css('visibility', 'hidden');
//            setTimeout(function() {
////                $(".response-container").css('visibility', 'visible');
//            }, 50);



        }

        $scope.refresh = function() {
//            var ran = (Math.random() * 1).toFixed(0)
//            $scope.q = $scope.questions.pool[ran];
            console.log("am i refreshing?");
            setTimeout(function() {
                if ($scope.q.type == 0) {
//                   console.log($scope.yesno);
                    $scope.q.a.push($scope.yesno);
                } else if ($scope.q.type == 1) {
                    for (var x = 0; x < $scope.answersChecked.length; x++) {
                        if ($scope.answersChecked[x] == true) {
                            $scope.q.a.push($scope.answers[x]);
                        }
                    }
                }
                console.log("am i prinitng?");
                console.log($scope.q);
//                $http.post('/testPost', $scope.q).success(function() {
//                    console.log("I am posting!")
//                }).error(function() {
//                    console.log("I failed to post, caused an error");
//                });
            }, 0);
            $window.location.reload();
        }
    }]);

})();

//document.onmousedown = function(e) {
//    if (e.button == 2) {
//        return false
//    }
//}