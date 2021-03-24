const Todo = require('../models/Todo')
const { multipleMongoseToObject } = require('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose')

class todosController {
    
    // GET todos/add
    add(req, res, next) {
        res.render('todos/add')
    }

    // GET /todos
    show(req, res, next) {
        Todo.find({user:req.user.id}).sort({creationDate: 'descending'})
            .then(todos => {
                res.render('todos/index', {todos: multipleMongoseToObject(todos)})
            })
            .catch(next)
    }

    // GET /todos/edit/:id
    edit(req, res, next) {
        Todo.findOne({_id: req.params.id})
            .then(todo => {
                if (todo.user != req.user.id) {
                    req.flash('error_msg', 'Not authorized');
                    res.redirect('/todos');
                } else {
                    res.render('todos/edit', {
                        todo: mongooseToObject(todo)
                    });
                }
            })
    }

    // POST /todos/create
    postCreate(req, res, next) {
        let errors = []
        if(!req.body.title) {
            errors.push({
                text: 'Please add title'
            })
        }
        if(!req.body.details) {
            errors.push({
                text: 'Please add some details'
            })
        }

        if(errors.length > 0) {
            res.render('todos/add',{
                errors: errors,
                title: req.body.title,
                details: req.body.details,
                dueDate: req.body.duedate
            } )
        } else {
            const newTodo = {
                title: req.body.title,
                details: req.body.details,
                user: req.user.id,
                dueDate: req.body.duedate
            }
            new Todo(newTodo).save()
                .then(() => {
                    req.flash('success_msg', 'Todo added');
                    res.redirect('/todos')
                })
                .catch(next)
        }



    }

    // PUT /todos/:id
    update(req, res, next) {
        Todo.updateOne({_id: req.params.id}, req.body)
            .then(() => {
                req.flash('success_msg', 'Todo updated')
                res.redirect('/todos')
            })
            .catch(next)
    }

    // DELETE /todos/:id
    delete(req, res, next) {
        Todo.delete({_id:req.params.id})
            .then(() => {
                req.flash('success_msg', 'Deleted')
                res.redirect('back')
            })
            .catch(next)
    }
}

module.exports = new todosController