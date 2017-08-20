'use strict';


import React from 'react';
import $ from 'jquery'
import TodoList from './todolist.js'

import { Router, Route, hashHistory } from 'react-router';

require('../public/main.scss');

class App extends React.Component {
    // var App = React.createClass({
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            showTooltip: false  // 控制 tooltip 的显示隐藏
        }
    }
    // 提交表单操作
    handleSubmit(event) {
        event.preventDefault();
        // 表单输入为空验证
        if (this.refs.content.value == "") {
            this.refs.content.focus();
            this.setState({
                showTooltip: true
            });
            return;
        }

        let month = new Date().getMonth() + 1;
        let date = new Date().getDate();
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        let seconds = new Date().getSeconds();

        if (hours < 10) { hours += '0'; }
        if (minutes < 10) { minutes += '0'; }
        if (seconds < 10) { seconds += '0'; }

        // 生成参数
        const newItem = {
            content: this.refs.content.value,
            date: month + "/" + date + " " + hours + ":" + minutes + ":" + seconds
        };
        // console.log(newItem);
        // // 添加 todo
        this._onNewItem(newItem)
        // // 重置表单
        // this.refs.todoForm.reset();
        // // 隐藏提示信息
        // this.setState({
        //     showTooltip: false,
        // });
        this.refs.content.value = "";
    }
    // 添加 todo
    componentDidMount () {
		// 获取所有的 todolist
		this._getTodoList();
  	}
    _getTodoList(){
        const that = this;
        $.ajax({
			url: '/getAllItems',
			type: 'get',
			dataType: 'json',
			success: data => {
				that.setState({ 
					todoList :data
				});
			},
			error: err => {
				console.log(err);
			}
		})
    }
	_onNewItem (newItem) {
		const that = this;
		$.ajax({
			url: '/addItem',
			type: 'post',
			dataType: 'json',
			data:newItem,
			success: data => {
				const todoList = that.todoSort(data);
				that.setState({ 
					todoList 
				});
			},
			error: err => {
				console.log(err);
			}
		})
	}
    // 对 todolist 进行逆向排序（使新录入的项目显示在列表上面） 
	todoSort (todoList) {
		todoList.reverse();
		return todoList;
	}
    _onDeleteItem(id){
        // event.preventDefault();
        // var id = this.props.id;
        // console.log(id);
        const that = this;
        $.ajax({
            url:'/delete',
            type:'post',
            dataType:'json',
            data:{
                id:id
            },
            success:data =>{
                const todoList = that.todoSort(data);
                that.setState({ 
					todoList 
				});
            }

        })
    }
    render() {
        // console.log(props);
        return (
            <div>
                <div className="panel panel-primary">
                    <div className="panel-heading">A Simple TodoList</div>
                    <div className="panel-body col-md-12">
                        <div className="form-group">
                            <div className="form-inline">
                                <input type="text" ref="content" className="form-control col-md-6" placeholder="Write todolist" />
                                <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)} >Submit</button>
                            </div>
                        </div>
                        <div className="form-group">
                            <TodoList todoList={this.state.todoList}  onDeleteItem={this._onDeleteItem.bind(this)} />
                        </div>
                    </div>
                </div>

                {/*<TodoList todoList={this.state.todoList} onDeleteItem={this._onDeleteItem.bind(this)} />*/}
            </div>
        );
    }
};
export default App;