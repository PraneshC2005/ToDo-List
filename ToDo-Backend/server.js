const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/todolist')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});

const todoSchema = new mongoose.Schema({
    title:{
        required: true,
        type: String
    },
    description: String
});

const Todo = mongoose.model('Todo', todoSchema);

app.post('/todos', async (req, res) => {
    const { title, description } = req.body;
    try{
    const newTodo = new Todo({
        title,
        description
    });
    await newTodo.save();
    res.status(201).json(newTodo);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});
app.get('/todos', async (req, res) => {
    try{
        const todos = await Todo.find();
        res.status(200).json(todos);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});
app.put('/todos/:id', async (req, res) => {
try{
    const id= req.params.id;
    const { title, description } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate
    (id,
        {
            title,
            description
        },
        {
            new: true
        }
    )
    if(!updatedTodo){
        throw new Error('Todo not found');
    }
    res.status(200).json(updatedTodo);
}
catch(err){
    res.status(400).json({message: err.message});
}
});
app.delete('/todos/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if(!deletedTodo){
            throw new Error('Todo not found');
        }
        res.send("deleted successfully");
        res.status(204).end();
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});
const port = 3000;
app.listen(port, () => {
    console.log('Server is running on port 3000');
});