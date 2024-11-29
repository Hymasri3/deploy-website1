const ensureAuthentication = require('../Middlewares/HomeAuth');

const router=require('express').Router();


router.get('/',ensureAuthentication,(req,res)=>{
    console.log("LoggedIn",req.user);
    res.status(200).json([
        {
            name:"mobile",
            price:"1000"
        },
        {
            name:"laptop",
            price:"2000"
        }
    ])
});

module.exports=router;