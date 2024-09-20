import { Schema, model, Types } from 'mongoose';

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: 'false',
  },
});

const Task = model('Task', TaskSchema);

export default Task;
