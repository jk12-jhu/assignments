(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])

    .service('MenuSearchService', MenuSearchService)
    .controller('NarrowItDownController', NarrowItDownController)
    .directive('foundItems', foundItems);

  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
      }).then(function (response) {
        var data = response.data;
        var allItems = [];
        for (var category in data) {
          if (data.hasOwnProperty(category)) {
            for (var i = 0; i < data[category].menu_items.length; i++) {
              allItems.push(data[category].menu_items[i]);
            }
          }
        }
        var matchedItems = [];
        var term = searchTerm.toLowerCase();
        for (var j = 0; j < allItems.length; j++) {
          if (allItems[j].name.toLowerCase().indexOf(term) !== -1) {
            matchedItems.push(allItems[j]);
          }
        }
        return matchedItems;
      });
    };
  }

  function NarrowItDownController(MenuSearchService) {
    var vm = this;

    MenuSearchService.getMatchedMenuItems('').then(function (items) {
      vm.found = items;
    });

    vm.narrowItDown = narrowItDown;

    function narrowItDown() {
      MenuSearchService.getMatchedMenuItems(vm.searchTerm).then(function (items) {
        vm.found = items;
      });
    }

    vm.removeItem = removeItem;

    function removeItem(index) {
      vm.found.splice(index, 1);
    }
  }

  function foundItems() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundItems',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var foundItems = this;
  }

})();
