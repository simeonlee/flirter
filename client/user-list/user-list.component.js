angular
  .module('userList')
  .component('userList', {
    // Url is relative to our index.html file
    templateUrl: 'client/user-list/user-list.template.html',
    controller: function UserListController() {
      this.users = [
        {
          name: 'Simeon Lee',
          blurb: 'We going ham',
          age: 24,
          distance: 0.5
        },
        {
          name: 'Connor Chevli',
          blurb: 'They hate us cuz they ain\'t us',
          age: 32,
          distance: 0.8
        },
        {
          name: 'Josephine Eng',
          blurb: 'What',
          age: 22,
          distance: 0.4
        }
      ];

      this.orderProp = 'name';

    }
  });