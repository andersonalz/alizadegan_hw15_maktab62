const mongoose = require("mongoose");
const bcrypt = require("bcrypt");



const productSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    trim : true,
    unique: true,
    min: 2
  },
  password:{
    type: String,
    required: true,
    validate: {
        validator: function(v) {
          return /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/.test(v);
        },
    }
  },
  firstname: {
    type: String,
    required: true,
    min: 2,
    max :30

  },
  lastname: {
    type: String,
    required: true,
    min: 2,
    max :30
  }, 
  active: {
    type: Boolean,
    default: true
  },
  gender: {
      type : String,
      enum: ['male' , 'female' , 'other'],
      default : 'male'
    }
});

//////////////////hash//////////////
productSchema.pre('save', function(next){
  if(!this.isModified('password')){
    return next 
  }
  this.password = bcrypt.hashSync(this.password,10)
  next()
})

productSchema.method.comparePassword = function(plainText,callback){
  return callback(null,bcrypt.compareSync(plainText,this.password))
}

module.exports = mongoose.model("User", productSchema);

// const user = mongoose.model("User", productSchema);
// module.exports = user
