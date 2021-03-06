const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createLop = catchAsync(async (req, res) => {
  const user = await userService.createLop(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getLops = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryLops(filter, options);
  res.send(result);
});

const getlop = catchAsync(async (req, res) => {
  const user = await userService.getLopById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateLop = catchAsync(async (req, res) => {
  const user = await userService.updateLopById(req.params.userId, req.body);
  res.send(user);
});

const deleteLop = catchAsync(async (req, res) => {
  await userService.deleteLopById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLop,
  getLops,
  getlop,
  updateLop,
  deleteLop,
};
