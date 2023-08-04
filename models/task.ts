import { Schema, model, models } from 'mongoose';

import Label from './label';

const TaskSchema = new Schema({
  description: {
    type: String,
    required: [true, 'A description is required.'],
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
  },
  labels: [{ type: Schema.Types.ObjectId, ref: Label }],
});

const Task = models.Task || model('Task', TaskSchema);

export default Task;
