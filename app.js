angular.module('project', ['restangular', 'ngRoute']).
  config(function($routeProvider, RestangularProvider) {
    $routeProvider.
      when('/', {
        controller:ListCtrl,
        templateUrl:'list.html'
      }).
      when('/edit/:projectId', {
        controller:EditCtrl,
        templateUrl:'detail.html',
        resolve: {
          issue: function(Restangular, $route) {
            var id = $route.current.params.projectId;
            return Restangular.one('issues', id).get();
          }
        }
      }).
      when('/new', {
        controller:CreateCtrl,
        templateUrl:'detail.html'
      }).
      otherwise({redirectTo:'/'});

      RestangularProvider.setBaseUrl('http://localhost:3000/');
  });

function ListCtrl($scope, Restangular) {
  $scope.issues = Restangular.all("issues").getList().$object;
}

function CreateCtrl($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('issues')
      .post($scope.issue)
      .then(function(issue) {
        $location.path('/list');
    });
  }
}

function EditCtrl($scope, $location, Restangular, issue) {
  var original = issue;
  $scope.issue = Restangular.copy(original);

  $scope.destroy = function() {
    original.remove().then(function() {
      $location.path('/list');
    });
  };

  $scope.save = function() {
    $scope.issue.put().then(function() {
      $location.path('/');
    });
  };
}
