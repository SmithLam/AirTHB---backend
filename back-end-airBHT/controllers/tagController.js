const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Tag = require("../models/tag");

exports.getTags = catchAsync(async (req, res, next) => {
  const allDataLength = await Tag.countDocuments();
  // const filters = { ...req.query };
  //   const paginationKeys = ["limit", "page", "sort"];
  //   const page = req.query.page * 1 || 1;
  //   const limit = req.query.limit * 1 || 20;
  //   const skip = (page - 1) * limit;
  //   paginationKeys.map((el) => delete filters[el]);
  //   const q = Tag.find(filters).populate("tag")
  //   const tags = await q.limit(limit).skip(skip);
  //   const countTags = await Tag.find(filters).countDocuments();
  //   if (req.query.page && skip > countTags) {
  //     return next(new AppError(400, "Page number out of range"));
  //   }
  const tags = await Tag.find({});
  return res.status(200).json({
    status: "OK",
    data: tags,
    dataLength: allDataLength,
  });
});
