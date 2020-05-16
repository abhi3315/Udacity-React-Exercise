import React from 'react'
import { connect } from 'react-redux'
import Lists from './List'
import {
    handleDeleteGoal,
    handleAddGoal
} from '../actions/goals'

class Goals extends React.Component {
    addGoal = (e) => {
        e.preventDefault()

        if (this.input.value !== '') {
            this.props.dispatch(handleAddGoal(
                this.input.value,
                () => this.input.value = ''
            ))
        }
    }

    removeGoal = (goal) => {
        this.props.dispatch(handleDeleteGoal(goal))
    }

    render() {
        return (
            <div>
                <h1>Goals</h1>
                <input
                    type="text"
                    placeholder="Add Goal"
                    ref={input => this.input = input}
                />
                <button onClick={this.addGoal}>Add Goal</button>
                <Lists
                    lists={this.props.goals}
                    remove={this.removeGoal}
                />
            </div>
        )
    }
}

export default connect((state) => ({
    goals: state.goals
}))(Goals)