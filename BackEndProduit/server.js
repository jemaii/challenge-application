var express = require('express');
var bodyparser = require('body-parser');
var multer  = require('multer');
var fs = require('fs');
//var upload = multer({ dest: 'upload/' });
var app = express();
app.use(express.static(__dirname +"/public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
// GET 

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
  	var fileNumber = 0;
  	var saveFile =function(fileNumber,cb){
      if(!(fs.existsSync('upload/' + file.originalname))){
            cb(null, file.originalname) 
      }
      else{
        var save =function(fileNumber){
      fileNumber++;
  		var test = file.originalname + '(' + fileNumber + ')'
  		if (fs.existsSync('upload/' + test)) {
  		cb(null, test)
  		save(fileNumber);
  	} 
  	else{
    cb(null, test) 
    }
  }
  save(fileNumber);
  }
  }
 saveFile(fileNumber,cb);  
  }
})
var upload = multer({ storage: storage })
app.get('/', function (req, res) {
  res.send('homepage')
});
// POST 
app.post('/',upload.any(), function (req, res) {
  //res.redirect('index.html');
  res.end('Fichier est  ajouté');
});

var server = app.listen(3000, function() {
  console.log('Server listening on port ' + server.address().port);
});
