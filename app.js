var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var player = require('play-sound')(opts = {})
var cors = require('cors')

var port = process.env.PORT || 7000;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname + '/index.html'));
});

var sounds = [
  'best',
  'cube',
  'drumma',
  'fetty',
  'tonight'
]

app.post('/', (req, res) => {

  if (req.body.type === 'identify') {
    console.log(req.body.traits);
    var noise = sounds[Math.floor(Math.random()*sounds.length)]
    player.play('sounds/another.mp3', function(){
      player.play(`${noise}.mp3`)
    })
  }

  res.sendStatus(200);
})

app.listen(port, function () {
 console.log(`Example app listening on port ${port}!`);
});
