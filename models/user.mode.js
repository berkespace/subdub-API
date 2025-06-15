import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name :{ 
  type:String, 
  required: [true, 'User Name is required'],
  trim:true,
  minLength: 2,
  maxLength: 50,
},

email: { 
  type:String, 
  required: [true, 'Email is required'],
  unique: true,
  trim:true,
  lowercase: true,
  validate: {
    validator: function(v) {
      return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
    },
    message: props => `${props.value} is not a valid email!`
  },
  minLength: 5,
  maxLength: 255,
},

password: { 
  type:String, 
  required: [true, 'Password is required'],
  minLength: 6,
},

},{timestamps: true});


const User = mongoose.model('User', userSchema);

export default User;
