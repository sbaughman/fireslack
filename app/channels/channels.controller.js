angular.module('angularfireSlackApp')
  .controller('ChannelsCtrl', function($state, Auth, Users, profile, channels) {
    var channelsCtrl = this;

    channelsCtrl.profile = profile;
    channelsCtrl.channels = channels;
    channelsCtrl.displayName = Users.getDisplayName;
    channelsCtrl.getGravatar = Users.getGravatar;
    channelsCtrl.users = Users.all;
    channelsCtrl.newChannel = {
      name: ''
    };

    Users.setOnline(profile.$id);

    channelsCtrl.createChannel = function() {
      channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function() {
        $state.go('channels.messages', {channelId: ref.key()});
      });
    };

    channelsCtrl.logout = function() {
      channelsCtrl.profile.online = null;
      channelsCtrl.profile.$save().then(function(){
        Auth.$unauth();
        $state.go('home');
      });  
    };
  });
