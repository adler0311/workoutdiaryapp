'use strict';

/**
 * @ngdoc overview
 * @name traingingDiaryApp
 * @description
 * # traingingDiaryApp
 *
 * Main module of the application.
 */
angular
  .module('traingingDiaryApp', [])
  .filter('split', function() {
  	return function(input, splitChar, splitIndex) {
  		return input.split(splitChar)[splitIndex];
  	}
  });

