const Mongoose = require("mongoose");

let Schema = Mongoose.Schema;

let Person = new Schema({
  firstname: {
      type: String,
      required: [true,'El firstname es necesario']
  },
  lastname: {
      type:String,
      required: [true, 'El lastname es necesario']
  }
});


let model = Mongoose.model("personas", Person);

module.exports = model;