angular
  .module('flirterApp', [])
  .component('userList', {
    template:
      '<ul>' +
        '<li ng-repeat="user in $ctrl.users">' +
          '<span>{{user.name}}</span>' +
          '<p>{{user.blurb}}</p>' +
        '</li>' +
      '</ul>',
    controller: function UserListController() {
      this.users = [
        {
          name: 'Simeon Lee',
          blurb: 'We going ham'
        },
        {
          name: 'Connor Chevli',
          blurb: 'They hate us cuz they ain\'t us'
        },
        {
          name: 'Josephine Eng',
          blurb: 'What'
        }
      ];
    }
  });