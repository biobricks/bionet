const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = mongoose.Schema({
  createdAt    : { type: String, default: new Date() },
  updatedAt    : { type: String, default: new Date() },
  isAdmin      : { type: Boolean, default: false },
  username     : { type: String, required: true, index: { unique: true }},
  password     : String,
  name         : { type: String, required: true },
  email        : { type: String, required: true, index: { unique: true }},
  imageUrl     : { type: String, default: "" }
});

userSchema.methods.comparePassword = function(password, callback) {
  /* istanbul ignore next */
  bcrypt.compare(password, this.password, callback);
};

userSchema.pre('save', function saveHook(next) {
  const user = this; 
  // proceed further only if the password is modified or the user is new
  //if (!user.isModified('password')) return next();

  return bcrypt.genSalt((saltError, salt) => {
    /* istanbul ignore if  */
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      /* istanbul ignore if  */
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);