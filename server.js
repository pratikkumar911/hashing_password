const PORT = 8000;
const express = require("express");
const axios = require('axios');
const cors = require('cors')
const {v4:uuidv4} = require('uuid');
const bcrypt = require('bcrypt')

const app = express();
app.use(express.json())
app.use(cors())

const ASTRA_URL = "https://b8432f1f-7d08-4e22-8eb1-719680bf9b32-asia-south1.apps.astra.datastax.com/api/rest/v2/namespaces/hashedpassword/collections/hashedpassword_collection";
const STRA_TOKEN = "AstraCS:IZngwZHTbybdofjIxYoZAfaq:6afece76b87486fca37d0e04e78893b7b721e340c16a467fb0639bd4fef96dfe";
app.post('./signup',(req,res)=>{
    const {usename,password} = req.body;

    const userId = uuidv4();
    const hashedPassword = await bcrypt(password,10);

    const options = {
        method:"POST",
        header:{
            Accepts:"application/json",
            "X-Cassandra-Token":ASTRA_TOKEN,
            "Content-type":"application/json"
        },
        data:{username,userId,hashedPassword}
    }


    try {
        const response = await axios.post(ASTRA_URL,options)
        req.status(200).json(response.data)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
})

app.listen(PORT, ()=> console.log("Server is running on port " + PORT));
