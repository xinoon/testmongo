const Express = require("express");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
const Person = require('../model/dto/PersonDB');
var app = Express();

var  conn = mongoose.connect;

app.use(BodyParser.json());
app.use((req, res, next) => {

  // Dominio que tengan acceso (ej. 'http://example.com')
     res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Metodos de solicitud que deseas permitir
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
  // Encabecedados que permites (ej. 'X-Requested-With,content-type')
     res.setHeader('Access-Control-Allow-Headers', '*');
  
  next();
  })
app.use(BodyParser.urlencoded({ extended: true }));
app.use(require("../service/helpcheck"));
app.use(require("../service/Person"));



const options = {
  //loggerLevel: 'info',
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 250, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
   autoReconnect: true,
   auto_reconnect: true,
  bufferMaxEntries: 0,
  connectTimeoutMS: 1000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

app.listen(5000, () => {
  console.log("Listening at :8080...");
});

let uri = "mongodb+srv://usuario:welcome1@cluster0-xpyfm.mongodb.net/dbmongo"

  mongoose.connect(uri, options)
  .then(() => {
    process.env.STATUS = 'RUNNING'
  })
.catch((err) =>  {
  mongoose.connection.close();
  process.env.STATUS = 'UNAVAILABLE'
  //process.exit(1);  
});


// When successfully connected
mongoose.connection.on('connected', () => {
  process.env.STATUS = 'RUNNING'
  console.log('dbevent: open');
});

// When successfully reconnected
mongoose.connection.on('reconnected', () => {
  process.env.STATUS = 'RUNNING'
  console.log('dbevent: reconnected');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  process.env.STATUS = 'UNAVAILABLE'
  console.log(`dbevent: error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  process.env.STATUS = 'UNAVAILABLE'
  console.log('dbevent: disconnected');
});

