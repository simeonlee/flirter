angular
  .module('profile')
  .component('profile', {
    templateUrl: 'src/profile/profile.template.html',
    controller: ['User', function ProfileController(User) {
      this.self = User.self.query();
    }]
  });