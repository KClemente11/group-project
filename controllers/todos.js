const Todo = require('../models/Todo')
const Pet = require('../models/Pet')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try {
            const todoItems = await Todo.find({userId:req.user.id})
            const pets = await Pet.find({userId:req.user.id})
            const petCount = await Pet.countDocuments({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})  
            const date = await Todo.find({userId:req.user.id}).sort({date:-1})
            res.render('todos.ejs', {
                todos: todoItems, 
                pets: pets, 
                petCount: petCount, 
                left: itemsLeft,
                date: date,
                user: req.user
            })
            
        }catch (err) {
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, petName: req.body.petName, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    // getPreviousDay: async (req, res) => {
    //     const date = new Date()
    //     const previous = new Date(date.getTime())
    //     previous.setDate(date.getDate() - 1)

    //     return previous
    // },
    // getNextDay: async (req, res) => {
    //     const date = new Date()
    //     const next = new Date(date.getTime())
    //     previous.setDate(date.getDate() + 1)

    //     return next

    // }
}    