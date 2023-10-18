const mongoose = require('mongoose')



const dataSchema = new mongoose.Schema({
    name:{type:String , required:true},
    image:{type:String, required:true},
    productDescription:{type:String, required:true},
    productPrice:{type:String, required:true},
    createdAt:{type:String, default:Date.now()}
},{versionKey:false})

let DataModel = mongoose.model('datas',dataSchema)

module.exports = DataModel