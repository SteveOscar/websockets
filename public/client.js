var socket = io();

var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var confirmation = document.getElementById('vote-confirmation');

function formatTally(tally) {
  for (var vote in tally) {
      if (tally.hasOwnProperty(vote)) {
          var line = document.getElementById(vote);
          line.innerText ='Option ' + vote + ' votes: ' + tally[vote]
      }
  }
}

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = 'Connected Users: ' + message;
});

socket.on('voteCount', function (votes) {
  console.log(votes);
});

socket.on('voteReceived', function (message) {
  confirmation.innerText = 'Your vote was caste for: ' + message;
});

socket.on('tally', function (votes) {
  formatTally(votes);
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}
