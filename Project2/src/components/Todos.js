import React from 'react'
import { connect } from 'react-redux'
import Lists from './List'
import {
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo
} from '../actions/todos'

class Todos extends React.Component {
    addTodo = (e) => {
        e.preventDefault()

        if (this.input.value !== '') {
            this.props.dispatch(handleAddTodo(
                this.input.value,
                () => this.input.value = ''
            ))
        }
    }

    removeTodo = (todo) => {
        this.props.dispatch(handleDeleteTodo(todo))
    }

    toggleTodo = (id) => {
        this.props.dispatch(handleToggleTodo(id))
    }

    render() {
        return (
            <div>
                <h1>Todo List</h1>
                <input
                    type="text"
                    placeholder="Add Todo"
                    ref={input => this.input = input}
                />
                <button onClick={this.addTodo}>Add Todo</button>
                <Lists
                    lists={this.props.todos}
                    remove={this.removeTodo}
                    toggle={this.toggleTodo}
                />
            </div>
        )
    }
}

export default connect((state) => ({
    todos: state.todos
}))(Todos)