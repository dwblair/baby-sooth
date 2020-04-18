const {spawn} = require('child_process');

const python = spawn('python',['ser_trig.py']);

python.stdout.on('data',function(data){
console.log(data.toString());
});
