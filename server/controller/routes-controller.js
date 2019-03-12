// const Test = require('../models/dummy');
const User = require('../models/user');

// Create
const create = (req, res) => {
  const newUser = new User({ name: req.body.name, queue: req.body.queue });
  newUser.save(function (err, data) {
    if (err) { console.log('There was an error:', err); }
    if (data) {
      console.log('Successfully added user: ', data);
      res.status(200).json(data);
    }
  });
};

// Read
const read = (req, res) => {
  User.find({}).sort('-updatedAt').exec(function (err, data) {
    if (err) {
      console.log('Error getting the data: ', err);
    }
    if (data) {
      res.status(200).json(data);
    }
  });
};

// Read - Find by ID
const findById = (req, res) => {
  User.findOne({ _id: req.params.id }, function (err, data) {
    if (err) {
      console.log('Error getting the data: ', err);
    }
    if (data) {
      res.status(200).json(data);
    }
  });
};

// Read - Test JSON Data
const readTest = (req, res) => {
  res.status(200).json({ message: 'Changed!' });
};

// Update
const update = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, {
    $set: {
      name: req.body.name,
      queue: req.body.queue,
      updatedAt: req.body.updatedAt
    }
  }, { new: true }, (err, data) => {
    if (err) {
      console.log('Error getting the data: ', err);
    }
    if (data) {
      res.status(200).json(data);
    }
  });
};

// Destroy
const destroy = (req, res) => {
  User.findOneAndDelete({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log('Error getting the data: ', err);
    }
    if (data) {
      console.log('deleted user: ', data.name);
      res.status(200).json(data);
    }
  });
};

module.exports = {
  create,
  read,
  findById,
  readTest,
  update,
  destroy
};
