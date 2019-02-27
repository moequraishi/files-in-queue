// const Test = require('../models/dummy');
//
//
// const getData = (req,res) => {
//   res.status(200).json({ message: 'Connected!' });
// };
//
// const updateData = (req, res) => {
//   res.status(200).json({ message: req.body.message });
// };
//
// const updateUser = (req, res) => {
//   Test.findOneAndUpdate({_id: req.params.id}, {$set: {name: req.body.name, updatedAt: req.body.updatedAt} }, {new: true}, (err, data) => {
//     if (err) {console.log('Error getting the data: ', err)}
//     if (data) {
//       // console.log('User updated: ', data.name);
//       res.status(200).json(data);
//     }
//   });
// };
//
// const newUser = (req, res) => {
//   const newTest = new Test({name: req.body.name});
//   newTest.save(function(err, data) {
//     if (err) {console.log('There was an error:', err)}
//     if (data) {
//       console.log('Successfully added user: ', data);
//       res.status(200).json(data);
//     }
//   });
// };
//
// const getAll = (req, res) => {
//   Test.find({}).sort('-updatedAt').exec(function(err, data) {
//     if (err) {console.log('Error getting the data: ', err)}
//     if (data) { res.status(200).json(data) }
//   });
// };
//
// const destroy = (req, res) => {
//   Test.findOneAndDelete({_id: req.params.id}, (err, data) => {
//     if (err) {console.log('Error getting the data: ', err)}
//     if (data) {
//       console.log('deleted user: ', data.name);
//       res.status(200).json(data);
//     }
//   });
// };
//
// module.exports = {
//   getAll,
//   getData,
//   updateData,
//   updateUser,
//   newUser,
//   destroy
// };
