(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])

    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .controller('ToBuyController', ['$scope', 'ShoppingListCheckOffService', ToBuyController])
    .controller('AlreadyBoughtController', ['$scope', 'ShoppingListCheckOffService', AlreadyBoughtController]);

  function ShoppingListCheckOffService() {
    var todo = [
      { name: 'Buy 10 cookies' },
      { name: 'Buy 20 apples' },
      { name: 'Buy 5 bananas' },
      { name: 'Buy 1 loaf of bread' },
      { name: 'Buy 2 liters of milk' }
    ];

    var bought = [];

    return {
      getTodo: function () { return todo; },
      getBought: function () { return bought; },
      removeTodo: function (item) {
        var index = todo.indexOf(item);
        if (index !== -1) {
          todo.splice(index, 1);
          bought.push({ name: item.name });
        }
      }
    };
  }

  function ToBuyController($scope, ShoppingListCheckOffService) {
    var vm = this;

    vm.items = ShoppingListCheckOffService.getTodo();
    vm.isEmpty = false;
    vm.boughtItem = boughtItem;

    $scope.$watch(
      function () { return ShoppingListCheckOffService.getTodo().length; },
      function (length) { vm.isEmpty = length === 0; }
    );

    function boughtItem(item) {
      ShoppingListCheckOffService.removeTodo(item);
    }
  }

  function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
    var vm = this;

    vm.items = ShoppingListCheckOffService.getBought();
    vm.isEmpty = vm.items.length === 0;

    $scope.$watch(
      function () { return ShoppingListCheckOffService.getBought().length; },
      function (length) { vm.isEmpty = length === 0; }
    );
  }

})();
