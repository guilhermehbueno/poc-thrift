var argv = require('minimist')(process.argv.slice(2));

var http = require('http');
var multimeter = require('multimeter');
var cookie = require('cookie');

var multi = multimeter(process);
multi.on('^C', process.exit);
multi.charm.reset();

var bars = [];

multi.write('Progress:\n\n');

var s = "Yes"
multi.write(s);

var barYes = multi(s.length + 10, 0 + 3, {
  width : 20,
  solid : {
    text : '|',
    foreground : 'white',
    background : 'blue'
  },
  empty : { text : ' ' },
});
bars.push(barYes);

var name = "\n\nNo"
multi.write(name);

var barNo = multi(s.length + 10, 2 + 3, {
  width : 20,
  solid : {
    text : '|',
    foreground : 'white',
    background : 'blue'
  },
  empty : { text : ' ' },
});
bars.push(barNo);

var charm = multi.charm;
charm.write('\n\nResult: ');

if(!argv.t){
  argv.t=1000
}

if(!argv.h){
  argv.h='http://192.168.50.4:8080'
}

var max = argv.t;
var count =0;
var noCount=0;
var yesCount=0;

for (var i = 0; i < max; i++) {
  http.get(argv.h, function(res) {
    try {
      res.on('end', function(){
        var cookies = cookie.parse(res.headers['set-cookie'].join());
        count++;
        if(cookies.experiment === "no"){
          noCount++;
        }else{
          yesCount++;
        }

        barYes.percent(yesCount/count * 100);
        barNo.percent(noCount/count * 100);

        charm.position(function (x, y) {
          charm
          .position(x, y)
          .left(x - "\n\nResult: ".length)
          .erase('end')
          .write(count.toString());
        });
      });

      var body = "";
      res.on('data', function (chunk) {
        body+=chunk;
      });
    } catch(error){
      console.log("Got error: " + error);
    }
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};