angular
  .module('userList')
  .component('userList', {
    // Url is relative to our index.html file
    templateUrl: 'user-list/user-list.template.html',
    controller: ['$http',
      function UserListController($http) {
        var self = this;
        self.orderProp = 'age';

        /*
        Since we are making the assignment of the users
        property in a callback function, where the 
        this value is not defined, we also introduce a
        local variable called self that points back to 
        the controller instance.
        */

        // make http GET request to our server asking for users.json
        // The url is relative to our index.html file
        // $http service returns a promise object with a then() method
        $http.get('sample-data/users.sample.json').then(function(response) {
          // Ng detects json response and parses it for us into the 
          // data property of the response object passed to our callback
          self.users = response.data.slice(0, 5); // limit to first 5 in list
          // self.users = response.data;
        });
      }
    ]
  });

    // controller: function UserListController() {
    //   this.users = [
    //     {
    //       name: 'Simeon Lee',
    //       blurb: 'We going ham',
    //       age: 24,
    //       distance: 0.5
    //     },
    //     {
    //       name: 'Connor Chevli',
    //       blurb: 'They hate us cuz they ain\'t us',
    //       age: 32,
    //       distance: 0.8
    //     },
    //     {
    //       name: 'Josephine Eng',
    //       blurb: 'What',
    //       age: 22,
    //       distance: 0.4
    //     }
    //   ];

    //   this.orderProp = 'name';

    // }