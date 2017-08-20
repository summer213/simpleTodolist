import React from 'react';


class TodoItem extends React.Component {
    handleDelete(event) {
        event.preventDefault();
        var id = this.props.id;
        this.props.onDeleteItem(id);
    }
    render() {
        return (
            <div>
                <div className="form-group">
                    <div className="form-inline">
                        <div ref="content" className="form-control">{this.props.content}
                            <span>{this.props.date}</span>
                        </div>
                        <button className="btn btn-primary delete" onClick={this.handleDelete.bind(this)}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}
class TodoList extends React.Component {
    render() {
        var todoList = this.props.todoList;
        var TodoItems = todoList.map((item, index) => {
            return (
                <TodoItem key={index} content={item.content} date={item.date} id={item._id} onDeleteItem={this.props.onDeleteItem} />
            )
        })
        // console.log(todoList);
        return (
            <div>
                {TodoItems}
            </div>
        )
    }
}

export default TodoList;