var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema({
	content: {
		type: String
		// required: true
	},
	date: {
		type: String
		// required: true
	},
	isfinish:{
		type: Number
	}
}, { collection: 'todolist' });

//查询的静态方法
Todo.statics = {
	fetch: function (cb) { //查询所有数据
		return this
			.find()
			.sort('meta.updateAt') //排序
			.exec(cb) //回调
	},
	findById: function (id, cb) { //根据id查询单条数据
		return this
			.findOne({ _id: id })
			.exec(cb)
	}
}

module.exports = Todo;