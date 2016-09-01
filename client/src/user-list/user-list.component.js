angular
  .module('userList')
  .component('userList', {
    // Url is relative to our index.html file
    templateUrl: 'src/user-list/user-list.template.html',
    controller: ['User',
      function UserListController(User) {
        // var self = this;

        /*
        Since we are making the assignment of the users
        property in a callback function, where the 
        this value is not defined, we also introduce a
        local variable called self that points back to 
        the controller instance.
        */

        /*// make http GET request to our server asking for users.json
        // The url is relative to our index.html file
        // $http service returns a promise object with a then() method
        $http.get('sample-data/users.sample.json').then(function(response) {
          // Ng detects json response and parses it for us into the 
          // data property of the response object passed to our callback
          self.users = response.data.slice(0, 5); // limit to first 5 in list
          // self.users = response.data;
        });*/

        this.users = User.users.query();
        console.log(this.users);
        this.orderProp = 'distance';

      }
    ]
  });