const Tag = require("../models/tag");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.deleteOne = (Model) =>catchAsync(async (req, res, next) => {
    let filteredObj = {};
    if (Model.modelName === "Experiences") {
      (filteredObj._id = req.params.expID)
        // (filteredObj.host = req.user._id);
    } else if (Model.modelName === "Review") {
      (filteredObj._id = req.params.revID), (filteredObj.author = req.user._id);
    }
    console.log(filteredObj);
    const doc = await Model.findOneAndDelete(filteredObj);
    console.log(Model);
    console.log(doc);
    if (!doc) {
      return next(new AppError("404", "No document found"));
    }
    doc.save();
    res.status(204).end();
  });

//  obj.title = faker.lorem.sentence();
//  obj.pictureURL = [
//    faker.image.image(),
//    faker.image.image(),
//    faker.image.image(),
//    faker.image.image(),
//    faker.image.image(),
//  ];
//  obj.groupS = Math.floor(Math.random() * 15);
//  obj.duration = Math.floor(Math.random() * 10);
//  obj.price = Math.floor(Math.random() * 100);
//  obj.age = Math.floor(Math.random() * 25);
//  obj.tags = await Tag.convertToObject([
//    tags[Math.floor(Math.random() * 10)],
//    tags[Math.floor(Math.random() * 10)],
//  ]);
//  obj.country = faker.address.country();
//  obj.items = [
//    faker.lorem.sentence(),
//    faker.lorem.sentence(),
//    faker.lorem.sentence(),
//    faker.lorem.sentence(),
//  ];
//  obj.description = faker.lorem.paragraphs();



exports.updateOne = (Model) => async (req, res, next) => {
  try {
    let filteredObj = {};
    let allows = []; //the fields that we allow the user to change, depending on the Model
    if (Model.modelName === "Experiences") {
    
      (filteredObj._id = req.params.expID),
        // (filteredObj.host = req.user._id),
        (allows = ["title", "description", "tags", "duration", "groupS", "country", "age", "pictureURL", "price", "items"]);
      if (req.body.tags) {
        req.body.tags = await Tag.convertToObject(req.body.tags);
      }
    } else if (Model.modelName === "Review") {
      (filteredObj._id = req.params.revID),
        (filteredObj.author = req.user._id),
        (allows = ["rating", "description"]);
    }
    //finddata
    const doc = await Model.findOne(filteredObj);
    if (!doc) {
      return res
        .status(404)
        .json({ status: "fail", message: "No document found" });
    }
    //modify data
    //allow the field for user to change if it's allowed the doc[key] will change the field
    console.log(allows);
    for (let key in req.body) {
      //for let key in req.body
      console.log(key);
      if (allows.includes(key)) {
        doc[key] = req.body[key];
        //doc.title = req.body.title
      }
    }
    await doc.save();
    res.status(200).json({ status: "ok", data: doc });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};
