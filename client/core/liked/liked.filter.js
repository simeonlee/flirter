angular
  .module('core')
  .filter('liked', function() {
    return function(input) {
      return input ? 'You liked this person \u2665' : 'You didn\'t like this person \u2718';
    }
  })