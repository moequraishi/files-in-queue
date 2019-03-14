const mongoose = require('mongoose');
const uri = 'mongodb://moe:Allheart123@ds231588.mlab.com:31588/heroku_q3hqxljh';
const local = 'mongodb://localhost/inqueue-app';

mongoose.connect(process.env.MONGODB_URI || local, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected!');
  }).catch((err) => {
    console.log('MongoDB Connection Error:', err);
    process.exit(1);
  });
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: { type: String, required: true, minlength: [3, 'Name cannot be less than 3 characters.'], maxlength: [255, 'Name cannot exceed 255 characters.'] },
  queue: { type: Array, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Test = mongoose.model('User', testSchema);

module.exports = Test;
