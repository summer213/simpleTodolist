'use strict';


import React from 'react';
import $ from 'jquery'
import TodoList from './todolist.js'
import { Row, Col, Input, Button, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import { Router, Route, hashHistory } from 'react-router';

require('../public/main.scss');
require('../../node_modules/antd/dist/antd.css');
class App extends React.Component {
    // var App = React.createClass({
    constructor(props) {
        super(props);
        this.state = {
            todoList: []
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
            content: this.refs.content.refs.input.value,
            date: month + "/" + date + " " + hours + ":" + minutes + ":" + seconds,
            isfinish: 0
        };
        // // 添加 todo
        this._onNewItem(newItem)
        // // 重置表单
        // this.refs.todoForm.reset();
        // // 隐藏提示信息
        // this.setState({
        //     showTooltip: false,
        // });
        this.refs.content.refs.input.value = "";
    }
    // 添加 todo
    componentDidMount () {
		// 获取所有的 todolist
		this._getTodoList();
  	}
    _getTodoList(){
        const that = this;
        $.ajax({
			url: '/getTodoItems',
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
    _getFinishList(){
        const that = this;
        $.ajax({
			url: '/getFinishItems',
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
                console.log(data);
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
    _onDeleteItem(deletItem){
        // event.preventDefault();
        // var id = this.props.id;
        // console.log(deletItem);
        const that = this;
        $.ajax({
            url:'/delete',
            type:'post',
            dataType:'json',
            data:deletItem,
            success:data =>{
                const todoList = that.todoSort(data);
                that.setState({ 
					todoList 
				});
            }

        })
    }
    _onFinishItem(id){
        const that = this;
        $.ajax({
            url:'/FinishItems',
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
    _onEditItem(editItem){
        const that = this;
        $.ajax({
            url:'/EditItems',
            type:'post',
            dataType:'json',
            data:editItem,
            success:data =>{
                console.log(data);
                const todoList = that.todoSort(data);
                that.setState({ 
					todoList 
				});
            }

        })
    }
    tabCallback(key) {
        if(key==='2'){
            this._getFinishList();
        }else if(key==='1'){
            this._getTodoList();
        }
    }
    render() {
        // console.log(props);
        return (
            <div>
                <div className="panel">
                    <Tabs defaultActiveKey="1" onChange={this.tabCallback.bind(this)}>
                        <TabPane tab="待办事件" key="1">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Input type="text" ref="content" placeholder="Write todolist" />
                                </Col>
                                <Col span={12} className="gutter-row">
                                    <Button  className="gutter-box" type="primary" onClick={this.handleSubmit.bind(this)} >Submit</Button>
                                </Col>
                            </Row>
                            <div className="todolist">
                                <TodoList todoList={this.state.todoList}  onDeleteItem={this._onDeleteItem.bind(this)} onFinishItem={this._onFinishItem.bind(this)} onEditItem={this._onEditItem.bind(this)}/>
                            </div>
                        </TabPane>
                        <TabPane tab="已完成" key="2">
                                <TodoList todoList={this.state.todoList}  onDeleteItem={this._onDeleteItem.bind(this)} onFinishItem={this._onFinishItem.bind(this)} onEditItem={this._onEditItem.bind(this)}/>
                        </TabPane>   
                    </Tabs>
                {/*<TodoList todoLis`t={this.state.todoList} onDeleteItem={this._onDeleteItem.bind(this)} />*/}
                </div>
            </div>
        );
    }
};
export default App;