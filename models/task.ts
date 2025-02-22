import { Schema, model, models } from 'mongoose';

import Label from './label';

const TaskSchema = new Schema({
  userId: { type: String },
  description: {
    type: String,
    required: [true, 'A description is required.'],
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
  },
  labels: [{ type: Schema.Types.ObjectId, ref: Label }],
  order: {
    type: Number,
    required: [true, 'An order is required.'],
  },
  dueDate: {
    type: Date,
  },
  isDue: {
    type: Boolean,
  },
});

const Task = models.Task || model('Task', TaskSchema);

export default Task;
