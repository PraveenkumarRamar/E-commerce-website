const express = require('express')
const router = express.Router()
const {createToken, validate,hashPassword,comparePassword} = require('../auth')
const UserModel = require('../Schema/userSchema')
const DataModel = require('../Schema/dataSchema')

router.get('/', async (req, res) => {
    let data = await UserModel.find()
    res
        .status(200)
        .send({
            message: "Data fetched successfully",
            data
        })
})

router.post('/signup', async (req, res) => {
    try {
        let user = await UserModel.findOne({email:req.body.email})
        if(!user){
            req.body.password = await hashPassword(req.body.password)
            let newUser = await UserModel.create(req.body)
            res
                .status(200)
                .send({
                    message: "Sign-up successfully"
                })
        }else{
            res
            .status(401)
            .send({
                message: `User already enrolled with this Email ${req.body.email}, please try with other mail`
            })
        }
    } catch (error) {
        res
            .status(401)
            .send({
                message: error?.message
            })
    }
})

router.post('/signin', async (req, res) => {
    try {
        let data = await UserModel.findOne({ email: req.body.email })
        if (data) {
            if (comparePassword(req.body.password , data.password)) {
                // let token = await createToken(data)
                let data = await DataModel.find()
                res
                    .status(200)
                    .send({
                        message: "Sign-in successfully",
                        data
                        // token
                    })
            } else {
                res
                    .status(401)
                    .send({
                        message: "Incorrect creditionals"
                    })
            }
        } else {
            res
                .status(401)
                .send({
                    message: "User Doesn't exists"
                })
        }
    } catch (error) {
        res
            .status(401)
            .send({
                message: error?.message
            })
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        let data = await UserModel.findByIdAndUpdate(req.params.id)
        if (data) {
            data.email = req.body.email,
                data.name = req.body.name,
                data.mobile = req.body.mobile,
                data.dob = req.body.dob,
                data.password = req.body.password,
                await data.save()
            res
                .status(200)
                .send({
                    message: "Data updated"
                })
        }
        else {
            res
                .status(401)
                .send({
                    message: "data doesn't exists"
                })
        }
    } catch (error) {
        res
            .status(401)
            .send({
                message: error?.message
            })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        let data = await UserModel.findByIdAndDelete(req.params.id)
        if (data) {
            res
                .status(200)
                .send({
                    message: "Data deleted"
                })
        }
        else {
            res
                .status(401)
                .send({
                    message: "data doesn't exists"
                })
        }
    } catch (error) {
        res
            .status(401)
            .send({
                message: error?.message
            })
    }
})


// router for get datas

router.get("/data", async(req, res)=>{
    try {
        let data = await DataModel.find()
        if(data){
            res
            .status(200)
            .send({
                message:"Data fetched succesfully",
                data
            })
        }else{
            res
            .status(401)
            .send({
                message:"Data not found"
            })
        }
    } catch (error) {
        res
        .status(401)
        .send({
            message:error?.message
        })
    }
})

router.post("/add-data", async(req, res)=>{
    try {
        let data = await DataModel.create(req.body)
            res
            .status(200)
            .send({
                message:"Data added succesfully"
            })
    } catch (error) {
        res
        .status(401)
        .send({
            message:error?.message
        })
    }
})


router.put("/edit-data/:id", async(req, res)=>{
    try {
        let data = await DataModel.findByIdAndUpdate(req.params.id)
        if(data){
            data.name = req.body.name
            data.image = req.body.image
            data.productDescription = req.body.productDescription
            data.productPrice = req.body.productPrice
            await data.save()
        }
            res
            .status(200)
            .send({
                message:"Data updated succesfully"
            })
    } catch (error) {
        res
        .status(401)
        .send({
            message:error?.message
        })
    }
})


router.delete("/delete-data/:id", async(req, res)=>{
    try {
        let data = await DataModel.findByIdAndDelete(req.params.id)
            res
            .status(200)
            .send({
                message:"Data deleted succesfully"
            })
    } catch (error) {
        res
        .status(401)
        .send({
            message:error?.message
        })
    }
})


module.exports = router