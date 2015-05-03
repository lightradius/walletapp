'use strict';

/**
* @ngdoc overview
* @name denApp
* @description
* # walletApp
*
* Main (and only) module of the application.
*/

angular
.module('walletApp', [
  'ngTouch',
  'ngMessages',
  'LocalStorageModule' // Used to store our data locally
])
.factory('init', function() {
  /**
  * Setting up and returning our chosen initial conditions
  */
  var
  wallet = {
    total: 100,
    transactions: []
  },
  options = [
    {
      name: 'add',
      value: 'Add'
    },
    {
      name: 'remove',
      value: 'Remove'
    }
  ];

  return {
    getWallet: function() {
      return wallet;
    },
    getOptions: function() {
      return options;
    }
  }

});
