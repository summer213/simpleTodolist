var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Todo = require('../moudels/todo');
// 获取待办事项
router.get('/getTodoItems', (req, res, next) => {
    Todo.find({'isfinish':0}).sort({"date":-1}).exec((err, todoList) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todoList);
        }
    })
})
// 获取已完成事项
router.get('/getFinishItems', (req, res, next) => {
    Todo.find({'isfinish':1}).sort({"date":-1}).exec((err, todoList) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todoList);
        }
    })
})
// 添加todo
router.post('/addItem', (req, res, next) => {
    let newItem = req.body;
    // console.log(req.body);
    Todo.create(newItem, (err) => {
        if (err) {
            console.log(err);
        } else {
            Todo.find({'isfinish':0}, (err, todoList) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(todoList);
                }
            });
        }
    })
})
// 删除todo
router.post('/delete', (req, res, next) => {
    // console.log(req.body);
    var id = req.body.id;
    var isfinish = req.body.isfinish;
    var ObjectId = require('mongodb').ObjectId;
    var id = new ObjectId(id);
    Todo.remove({'_id':id}, (err) => {
        if (err) {
            console.log(err);
        } else {
            Todo.find({'isfinish':isfinish}, (err, todoList) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(todoList);
                }
            });
        }
    })
})

// 点击完成未完成事项
router.post('/FinishItems', (req, res, next) => {
    var id = req.body.id;
    var isfinish = req.body.isfinish;
    var ObjectId = require('mongodb').ObjectId;
    var id = new ObjectId(id);
    Todo.update({'_id':id},{isfinish:1},(err)=> {
        if (err) {
            console.log(err);
        } else {
            Todo.find({'isfinish':0}, (err, todoList) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(todoList);
                }
            });
        }
    })
})
// 点击编辑完成
router.post('/EditItems', (req, res, next) => {
    var id = req.body.id;
    var editcontent = req.body.content;
    var ObjectId = require('mongodb').ObjectId;
    var id = new ObjectId(id);
    Todo.update({'_id':id},{content:editcontent},(err)=> {
        if (err) {
            console.log(err);
        } else {
            Todo.find({'isfinish':0}, (err, todoList) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(todoList);
                }
            });
        }
    })
})

// //查询所有用户数据
// router.get('/todolist', function (req, res, next) {
//     Todo.fetch(function (err, todolist) {
//         if (err) {
//             console.log(err);
//         }
//         res.json(todolist)  //这里也可以json的格式直接返回数据res.json({data: users});
//     })
// })

module.exports = router;