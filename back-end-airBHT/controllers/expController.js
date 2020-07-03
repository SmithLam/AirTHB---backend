const Experiences = require("../models/experiences");
const Tag = require("../models/tag");
const { deleteOne, updateOne } = require("./handleFactory");
const faker = require("faker")

const tags = ["cooking", "cleaning", "dishwashing", "hiking", "cycling", "dating", "music", "culture", "magic tricks", "sports"]

// {
//   "title":,
//   "duration": ,
//   "description": ,
//   "country":,
//   "pictureURL": [],
//   "items": [],
//   "groupS":,
//   "price": ,
//   "age":,
//   "tags": []
// },



var randomName = faker.name.findName(); // Rowan Nikolaus
var randomPicture = faker.image.people()
var randomGroupS = Math.floor(Math.random() * 10)
var randomDuration = Math.floor(Math.random() * 10)
var randomPrice = Math.floor(Math.random() * 100)
var randomAge = Math.floor(Math.random() * 25)
var randomTag = tags[Math.floor(Math.random() * 10)]
var randomCountry = faker.address.country()
var randomItem = faker.lorem.sentence()
var randomDescription = faker.lorem.paragraphs()
// var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz






exports.getExperiences = async (req, res, next) => {
  try {
    const filters = { ...req.query };
    const paginationKeys = ["limit", "page", "sort"];
    paginationKeys.map((el) => delete filters[el]);
    console.log(filters);

    const q = Experiences.find({}).populate("tags").populate("host");
    const exp = await q.limit(10);
    return res.status(200).json({
      status: "OK",
      data: exp,
    });
  } catch (err) {
    return res.send(err.message);
  }
};

exports.getSingleExperience = async (req, res, next) => {
  try {
    const id = req.params.expID;
    if (!id) return res.send("Please input an ID!");
    const exp = await Experiences.findById(id)
      .populate("tags")
      .populate("host");
    if (!exp) return res.send("No valid experience found!");
    return res.status(200).json({
      status: "OK",
      data: exp,
    });
  } catch (err) {
    return res.send(err.message);
  }
};

exports.createExperience = async (req, res, next) => {
  try {
    const { title, description, tags, duration, country } = req.body;
    if (!title || !description || !tags) {
      return res.status(400).json({
        status: "fail",
        error: "title, description, tags are required",
      });
    }
    //tags is an array of string
    //we need to convert it to array of objectId
    //if a tag exists in tags collection, then we will use associate id as objectID
    //else, we need to create that Tag in the tag document, then return ID
    const newArr = await Tag.convertToObject(tags);
    const exp = await Experiences.create({
      ...req.body,
      tags: newArr,
      // host: req.user.id,
    });
    exp.save();
    return res.status(201).json({ status: "ok", data: exp });
  } catch (err) {
    return res.send(err.message);
  }
};

exports.deleteExperience = deleteOne(Experiences);
exports.updateExperience = updateOne(Experiences);
