import express from "express"
import mongoose from "mongoose"
import { channel } from "./models/User.js"
import { body, validationResult } from "express-validator";

const app = express()
const port = 3000

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/channel').then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})