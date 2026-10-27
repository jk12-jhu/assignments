(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])

    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .controller('ToBuyController', ['$scope', 'ShoppingListCheckOffService', ToBuyController])
    .controller('AlreadyBoughtController', ['$scope', 'ShoppingListCheckOffService', AlreadyBoughtController])
    .filter('priceFormat', priceFormat);

  function priceFormat() {
    return function(amount) {
      return '$$$' + amount.toFixed(2);
    };
  }

  function ShoppingListCheckOffService() {
    var todo = [
      { name: 'cookies', pricePerItem: 8.99, quantity: 10 },
      { name: 'apples', pricePerItem: 0.60, quantity: 20 },
      { name: 'bananas', pricePerItem: 0.25, quantity: 5 },
      { name: 'loaf of bread', pricePerItem: 4.99, quantity: 1 },
      { name: 'liters of milk', pricePerItem: 2.99, quantity: 2 }
    ];

    var bought = [];

    return {
      getTodo: function () { return todo; },
      getBought: function () { return bought; },
      removeTodo: function (item) {
        var index = todo.indexOf(item);
        if (index !== -1) {
          todo.splice(index, 1);
          var total = item.quantity * item.pricePerItem;
          bought.push({
            name: item.name,
            quantity: item.quantity,
            total: total
          });
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
