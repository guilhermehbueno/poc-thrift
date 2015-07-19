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
// charm.on('^C', process.exit);
// charm.reset();
// charm.write('    ');
charm.write('\n\nResult: ');

var max = 50000;
var count =0;
var noCount=0;
var yesCount=0;

for (var i = 0; i < max; i++) {
  http.get('http://192.168.50.4:8080', function(res) {
    if(res.headers.cookie){
      var cookies = cookie.parse(res.headers.cookie);
      console.log(JSON.stringify(cookies));
    }

    var body = "";
    res.on('end', function () {
      count++;
      body = body.substring(0,body.length-1)
      if(body === "no"){
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
    res.on('data', function (chunk) {
      body+=chunk;
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};