const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyACM0',{baudRate:9600})
var kill = require('tree-kill')

var player = require('play-sound')(opts = {})

var audio;

var playing = false;

var pids=[];

const parser = port.pipe(new Readline());
//parser.on('data',console.log);

parser.on('data',function(data) {

var str = data.toString();
console.log(str);

if(str.includes('0') && playing==true ) { 
for (let i=0; i< pids.length; i++) {
console.log('killing:',pids[i]);
kill(pids[i], 'SIGKILL', function(err) {});
}
pids=[];
playing=false;
}


if(str.includes('1') && playing==false) {
audio = player.play('river.mp3',false,function(err){
console.log('pids.length=',pids.length);
if(err && !audio.killed) throw err;
});
pids.push(audio.pid);
playing=true;
}



});


