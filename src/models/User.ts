import { model, models, Schema } from 'mongoose';
import { UserInterface } from './../typing/interfaces';

const schema = new Schema<UserInterface>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  inscriptionDate: { type: Date },
  avatar: String,
});

const UserModel = model<UserInterface>('User', schema);

export default models.User || UserModel;
