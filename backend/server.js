const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3000

const mockData = [
    {username : 'admin1' , password : '123456789'} , 
    {username : 'user007' , password : 'userza123'
    }
]

app.post('/login' , async (req ,res)=>{
    try{
        const {username , password} = req.body

        const user = mockData.find(u=>u.username===username && u.password === password)

        if(!user) return res.status(401).json({message :'user not found'})

        return res.status(201).json({message :"login success"})

    }catch(err){
        return res.json({message : err.message})
    }
})

app.listen(PORT)