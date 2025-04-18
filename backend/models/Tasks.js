const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date,  },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  category: { type: String},
  status: { type: String, enum: ['Pending', 'Progress', 'Completed'], default: 'Pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
module.exports = mongoose.model('Task', TaskSchema);
