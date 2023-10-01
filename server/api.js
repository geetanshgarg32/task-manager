const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/taskDB" , {useNewUrlParser: true});

const taskSchema = new mongoose.Schema({
    title: String,
    description: String
});
const Task = mongoose.model("Task", taskSchema);

app.route("/tasks")
    .get( (req,res)=>{
        Task.find().then(function(tasks){
            res.send(tasks);
        }).catch((error)=>{
            res.send(error);
        })
    })
    .post( (req,res)=>{
        const newTitle = req.body.title;
        const newDescription = req.body.description;
        const task = new Task({
            title: newTitle,
            description: newDescription
        });
        task.save().then(()=>{
            res.send("Successfully added a new task");
        }).catch((error)=>{
            res.send(error);
        });
    })
    .delete((req,res)=>{
        Task.deleteMany().then(()=>{
            res.send("Successfully deleted all the tasks");
        }).catch((error)=>{
            res.send(error);
        });
    });
    

    app.route("/tasks/:taskTitle")
        .get((req,res)=>{
            const taskTitle = req.params.taskTitle;
            Task.findOne({title: taskTitle}).then((foundTask)=>{
                if(foundTask){
                    res.send(foundTask);
                }else{
                    res.send("No tasks matching the title found");
                }
                
            }).catch((error)=>{
                res.send(error);
            })
        })
        .put((req,res)=>{
            Task.updateOne({title: req.params.taskTitle}
                ,{$set:{title: req.body.title, description: req.body.description}},
                {overwrite: true}).exec().then(()=>{
                    res.send("Successfully updated task");
            });
        })
        .delete((req,res)=>{
            Task.deleteOne({title: req.params.taskTitle}).then(()=>{
                res.send("Successfully deleted task");
            }).catch((error)=>{
                res.send(error);
            })
        })


    app.listen(port,()=>{
        console.log("Server started running on 3000");
    });

