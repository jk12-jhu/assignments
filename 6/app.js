(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.dishes = '';
  $scope.message = '';
  $scope.messageClass = '';
  $scope.inputClass = '';

  $scope.check = function () {
    var dishArray = $scope.dishes.split(',');

    // Will ignore empty dishes
    var count = dishArray.filter(function (d) { return d.trim() !== ''; }).length;

    if (count === 0) {
      $scope.message = 'Please enter data first';
      $scope.messageClass = 'red';
      $scope.inputClass = 'red-border';
    } else if (count <= 3) {
      $scope.message = 'Enjoy!';
      $scope.messageClass = 'green';
      $scope.inputClass = 'green-border';
    } else {
      $scope.message = 'Too much!';
      $scope.messageClass = 'green';
      $scope.inputClass = 'green-border';
    }
  };
}

})();
