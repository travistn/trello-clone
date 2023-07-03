import { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
  description: {
    type: String,
    required: [true, 'A description is required.'],
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
  },
});

const Task = models.Task || model('Task', TaskSchema);

export default Task;
