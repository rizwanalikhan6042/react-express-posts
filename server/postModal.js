

const mongoose = require('mongoose');
const cors = require('cors');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  viewCount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  }
  // Add other fields as needed
});



module.exports = mongoose.model('testpost', postSchema);
