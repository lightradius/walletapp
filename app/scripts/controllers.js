'use strict';

/**
* @ngdoc overview
* @name denApp
* @description
* # walletApp
*
* Main (and only) module of the application.
*/

angular.module('walletApp')
.controller('WalletCtrl', function ($scope, init, localStorageService) {
  /**
  * Setting up initial values
  */
  $scope.wallet = localStorageService.get('wallet') || init.getWallet();
  $scope.optionList = init.getOptions();
  $scope.option = $scope.optionList[0].name; // Sets up initialized value for the dropdown list, to avoid blank space.

  /**
  * Watching for changes in $scope.wallet to store them in the localStorageService
  */
  $scope.$watch('wallet', function () {
    localStorageService.set('wallet', $scope.wallet);
    console.log('Wallet successfully stored');
  }, true);

  /**
  * App functionality
  */
  $scope.reset = function() {

    if (confirm('Are you sure you want to reset?')) {
      // Clear local storage and reset $scope.wallet
      localStorageService.clearAll();
      $scope.wallet = init.getWallet();
      location.reload(); // Redraw $window
      console.log('Wallet successfully reset');
    }
  }

  $scope.newTransaction = function(option, amount) {

    var transaction = {
      date: new Date().toLocaleTimeString("en-us", {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
      })
    };

    if (option === $scope.optionList[1].name && $scope.wallet.total < amount) {
      // If removing currency from wallet and there is not enough currency left
      alert("You don't have enough money to perform this transaction.");
    } else {
      if (option === $scope.optionList[1].name) {
        // If removing currency, multiply amount by -1
        amount *= (-1);
      } else {
        // If adding multiply amount by 1 (ensuring we don't get a string concatenation)
        amount *= (1);
      }
      // Add result to our wallet.total and store the transaction in our wallet.transactions
      transaction.amount = amount;
      $scope.wallet.total += amount;
      $scope.wallet.transactions.push(transaction);
      console.log("Transaction successful: " + amount + "€");
    }
  }
});
