

var express = require("express"),
app = express(),
bodyParser  = require("body-parser"),
methodOverride = require("method-override");

const PORT = 4000;

const cors = require('cors'); 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

const api = require('./routes')
app.use('/api', api)
 
console.log("Loading API ...")
for(var i =0; i < api.stack.length; i ++){
  console.log("     http://localhost:"+PORT + api.stack[i].route.path)
}

app.listen(PORT, function() {
  console.log("Node server running on http://localhost:"+PORT);
});