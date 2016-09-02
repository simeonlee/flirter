angular
  .module('profile')
  .component('profile', {
    templateUrl: 'src/profile/profile.template.html',
    controller: ['User', 
      function ProfileController(User) {
        // this.self = User.self.query();

        console.log('dis works');

        this.self = {
          profilePhotoUrl: 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-1/p320x320/13432168_10153471694986783_3883692218191126423_n.jpg?oh=ae4eb4b310a05c129bf29bbc7d1ed40f&oe=58536B44',
          name: 'Simeon',
          age: 24,
          job: {
            position: 'Software Engineer',
            company: 'Google'
          },
          education: 'University of Southern California',
          bio: 'Hi! My name is Simeon and I love to dance',
          skills: ['dancing', 'lifting heavy things', 'being friendly'],
          interests: ['music', 'coding', 'food'],
          friends: ['Andrew Kim', 'Chris Avocado', 'Wendy Cheung'],
        };
      }
    ]
  });