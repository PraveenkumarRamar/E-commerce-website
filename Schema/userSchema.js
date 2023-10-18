const mongoose = require('mongoose')


function validateMail(value){
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ 
    return emailPattern.test(value)
}

function validateMob(e){
    let result = true;
    if(e.length==10){
        for(let i=0 ;i<e.length;i++){
            if(Number(e[i])==e[i]){
                continue
            }else{
                result = false
                break
            }
        }
    }else{
        result = false
    }
    return result
}
const userSchema = new mongoose.Schema({
    email:{type:String , required:true, validate:{validator:validateMail, message:"Invalid Email"}},
    name:{type:String, required:true},
    dob:{type:String, required:true},
    mobile:{type:String, required:true, validate:{validator:validateMob, message:"Please check the number"}},
    password:{type:String, required:true}
},{versionKey:false})

let UserModel = mongoose.model('users',userSchema)

module.exports = UserModel