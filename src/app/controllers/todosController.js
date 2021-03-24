const Todo = require('../models/Todo')

class todosController {
    
    // GET todos/add
    add(req, res, next) {
        res.render('todos/add')
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
                // user: req.user.id,
                dueDate: req.body.duedate
            }
            new Todo(newTodo).save()
                .then(() => {
                    req.flash('success_msg', 'Todo added');
                    res.redirect('/')
                })
                .catch(next)
        }



    }
}

module.exports = new todosController