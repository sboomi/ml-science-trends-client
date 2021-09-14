import bcrypt from 'bcrypt';
import { model, models, Schema } from 'mongoose';
import { UserInterface } from './../typing/interfaces';

const schema = new Schema<UserInterface>({
  name: {
    type: String,
    required: [true, "Username can't be empty"],
    maxlength: [20, "Name can't be above 20 characters"],
  },
  email: { type: String, required: true },
  password: {
    type: String,
    required: [true, "Password can't be empty"],
    minlength: [6, "Password can't be under 6 characters"],
  },
  inscriptionDate: { type: Date },
  avatar: String,
});

// Use bcrypt
schema.pre('save', function (next) {
  // do stuff
  let user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password, salt, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        user.password = hashedPassword;

        next();
      });
    });
  } else {
    next();
  }
});

const UserModel = model<UserInterface>('User', schema);

export default models.User || UserModel;
