const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  tag: {
    type: String,
    required: [true, "tag must have a name"],
    unique: true,
    trim: true,
    lowercase: true,
  },
});

schema.statics.convertToObject = async function (arr) {
  //   let arr = [...this.tags]; //array of strings
  //change it into an arr of Object
  //find the document tag from string
  //this here is Tag
  let foo = arr.map(async (item) => {
    let bar = await this.findOne({
      tag: item.toLowerCase().trim(),
    });
    if (!bar) {
      bar = await this.create({
        tag: item.toLowerCase().trim(),
      });
    }
    return bar;
  });
  let result = await Promise.all(foo);
  return result;
};

module.exports = mongoose.model("Tag", schema);
