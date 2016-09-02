// modules .config method gives access to available
// providers for configuration
// To make providers, services and directives defined
// in ngRoute available to our application,
// need to add ngRoute as dependency of our App module
angular.module('flirterApp', [
  'ngRoute',
  'core',
  'settings',
  'profile',
  'map',
  'userList',
  'userDetail'
]);

// userDetail module depends on the ngRoute module for
// providing $routeParams obj which is used in the userDetail component
// controller
// since ngRoute is also a dependency of the main module
// its services and directives are already availbale
// everywhere in teh application
// we could take out of sub-dependency but bad practice
// incase the parent module is not there one day