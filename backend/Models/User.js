const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        minLength:[10,'no should have minimum 10 digits'],
        maxLength:[10,'no should have minimum 10 digits'],
        match:[/\d{10}/,'no should only have digits']
    }
});

const UserModel=mongoose.model('users',UserSchema);
module.exports=UserModel;