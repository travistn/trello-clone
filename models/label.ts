import { Schema, model, models } from 'mongoose';

const LabelSchema = new Schema({
  color: {
    type: String,
    required: [true, 'A label color is required.'],
  },
  title: {
    type: String,
  },
});

const Label = models.Label || model('Label', LabelSchema);

export default Label;
