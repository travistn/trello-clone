import { Schema, model, models } from 'mongoose';

import Task from './task';

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A title is required.'],
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: Task,
      unique: true,
    },
  ],
  order: { type: Number, required: [true, 'An order is required.'] },
});

const List = models.List || model('List', ListSchema);

export default List;
