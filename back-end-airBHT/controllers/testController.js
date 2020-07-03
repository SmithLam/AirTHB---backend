const Experiences = require("../models/experiences");
const Tag = require("../models/tag");
const faker = require("faker");
const { response } = require("../app");

const tags = [
  "cooking",
  "cleaning",
  "dishwashing",
  "hiking",
  "cycling",
  "dating",
  "music",
  "culture",
  "magic tricks",
  "sports",
];

exports.createFaker = async (req, res, next) => {
  let objArr = [];
  for (let i = 0; i < 10; i++) {
  let obj = {};
  obj.title = faker.lorem.sentence();
  obj.pictureURL = [
    faker.image.image(),
    faker.image.image(),
    faker.image.image(),
    faker.image.image(),
    faker.image.image(),
  ];
  obj.groupS = Math.floor(Math.random() * 15);
  obj.duration = Math.floor(Math.random() * 10);
  obj.price = Math.floor(Math.random() * 100);
  obj.age = Math.floor(Math.random() * 25);
  obj.tags = await Tag.convertToObject([
    tags[Math.floor(Math.random() * 10)],
    tags[Math.floor(Math.random() * 10)],
  ]);
  obj.country = faker.address.country();
  obj.items = [
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
  ];
  obj.description = faker.lorem.paragraphs();
    objArr.push(obj);
  }
  const expTest = await Experiences.insertMany(objArr)
  // await expTest.save();
  return res.status(201).json({ status: "ok", data: expTest });
};
