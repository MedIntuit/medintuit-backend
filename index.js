import express from "express"
// import mongoose from "mongoose"
import { channel } from "./models/User.js"
import { body, validationResult } from "express-validator";
import bodyParser from 'body-parser';
import login from './routes/login.js'; 
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/login', login);

// mongoose.connect('mongodb://127.0.0.1:27017/channel').then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.log(err));

app.post('/api/channel',[
    body('name').isLength({min: 3}),    
    body('Description').isLength({min: 10}),  
    body('Field1').isNumeric(),    
    body('Field2').isNumeric(),    
    body('Field3').isNumeric(),    
    body('Field4').isNumeric(),    
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    channel.create({
        name: req.body.name,
        Description: req.body.Description,
        Field1: req.body.Field1,
        Field2: req.body.Field2,
        Field3: req.body.Field3,
        Field4: req.body.Field4,
      }).then(channel => res.json(channel))
      .catch(err=>{console.log(err)
        res.json({error: 'please enter a unique value for Field1'})
      })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})