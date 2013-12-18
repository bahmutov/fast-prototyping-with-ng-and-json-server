# fast prototyping with AngularJs Restangular against JSON-server

Installation:

```sh
// global tools
sudo npm install -g json-server
// this project's dependencies
bower install
```

Create sample data JSON file (or use issues.json)

```json
{
  "issues": [
    {
      "id": 101,
      "text": "something is not right"
    },
    {
      "id": 102,
      "text": "crash on login"
    }
  ]
}
```

Start the JSON REST server

```sh
json-server -f issues.json
```

Test returned values
```sh
curl http://localhost:3000/issues
curl http://localhost:3000/issues/101
```

you can try different verbs: PUT, DELETE, POST, GET - the data is updated

```sh
curl -X DELETE http://localhost:3000/issues/102
[
  {
    "id": 101,
    "text": "something is not right"
  }
]
```

Point restangular at JSON server's base url

```js
angular.module('project', ['restangular']).
    config(function(RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:3000/');
    });
...

// fetch all issues
$scope.issues = Restangular.all('issues').getList().$object;
```
Map new / edit / delete actions implicitly via Restangular.
In each case, redirect back to the index page to show updated list.

```js
function redirect() {
    $location.path('/list');
}

// add new issue
$scope.add = function() {
    // $scope.issue is copied from first one, see app.js
    Restangular.all('issues')
        .post($scope.issue)
        .then(redirect);
}

$scope.destroy = function() {
    original.remove().then(redirect);
};

// edit
$scope.save = function() {
    $scope.issue.put().then(redirect);
};
```

Open *index.html* in the browser and enjoy!
