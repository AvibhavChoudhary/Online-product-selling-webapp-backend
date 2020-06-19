 var mongoose = require('mongoose');
 const crypto=require('crypto');
const uuidv1= require('uuid/v1');



  var userSchema = new mongoose.Schema({
    name:{
      type: String,
      required:true,
      maxlength:25,
      trim:true
    },
    lastName:{
      type:String,
      maxlength:25,
      trim:true
    },
    email:{
      type:String,
      unique:true,
      required:true,
      trim:true
    },
    userInfo:{
      type:String,
      trim:true
    },
    //TODO
    encry_password:{
      type:String,
      trim:true,
    },
    salt:String,
    role:{
      type:Number,
      default:0
    },
    purchases:{
      type:Array,
      default:[]
    }
  },{timestamps:true});


  userSchema.virtual("password")
            .set(function (password){
              this._password=password
              this.salt=uuidv1
              this.encry_password= this.securePassword(password)

            })
            .get(function(){
              return this.password
            })

  userSchema.methods={

    authenticate:function(plainPassword){
      return this.securePassword(plainPassword)===this.encry_password
    },


    securePassword: function (plainPassword){
      if(!plainPassword) return ""
      try {
        
        return crypto.createHmac("sha256",this.salt).update(plainPassword)
        .digest('hex')

      } catch (err) {
        return ""
      }
    }
  }

module.exports =mongoose.model("User",userSchema)