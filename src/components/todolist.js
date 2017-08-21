import React from 'react';
import { Row, Col, Button, Input} from 'antd';
require('../public/main.scss');

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isedit: false,
            content: this.props.content
        }
    }
    handleDelete(event) {
        event.preventDefault();
        var deleteItem = {
            id:this.props.id,
            isfinish:this.props.isfinish
        }
        this.props.onDeleteItem(deleteItem);
    }
    handleFinish(event){
        event.preventDefault();
        var id = this.props.id;
        this.props.onFinishItem(id);
    }
    handleEdit(event){
        event.preventDefault();
        const that = this;
        this.setState({
            isedit:!that.state.isedit
        });
        var editItem = {
            id:this.props.id,
            content:this.refs.content.refs.input.value
        }
        if(this.state.isedit){
            this.props.onEditItem(editItem);
        }
    }
    onChange(event){;
        this.setState({
            content:event.target.value
        })
        this.refs.content.refs.input.value = this.state.content;
    }
    render() {
        return (
            <div>
                <div className="todoItem">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Row className={this.props.isfinish?'finishItem-con':'todoItem-con'}>
                                <Col span={16}>
                                    <Input ref="content" value={this.state.content} onChange={this.onChange.bind(this)} disabled={!this.state.isedit}/>
                                </Col>
                                <Col span={8}>
                                    <span className="add-time">{this.props.date}</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4} className="gutter-row" style={{display:this.props.isfinish?'none':'block'}}>
                            <Button className="gutter-box" type="primary" onClick={this.handleEdit.bind(this)}>{this.state.isedit?'编辑完成':'编辑'}</Button>
                        </Col>
                        <Col span={4} className="gutter-row" style={{display:this.props.isfinish?'none':'block'}}>
                            <Button className="gutter-box" type="primary" onClick={this.handleFinish.bind(this)}>完成</Button>
                        </Col>
                        <Col span={4} className="gutter-row">
                            <Button className="gutter-box" type="danger" onClick={this.handleDelete.bind(this)}>Delete</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
class TodoList extends React.Component {
    render() {
        var todoList = this.props.todoList;
        var TodoItems = [];
        todoList.forEach(function(item, index) {
            TodoItems.push(
                <TodoItem key={index} content={item.content} date={item.date} id={item._id} isfinish={item.isfinish} onDeleteItem={this.props.onDeleteItem} onFinishItem={this.props.onFinishItem} onEditItem={this.props.onEditItem}/>
            )
        }.bind(this));
        return (
            <div>
                {TodoItems}
            </div>
        )
    }
}

export default TodoList;