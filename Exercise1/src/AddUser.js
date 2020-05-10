import React, { Component } from 'react'

class AddUser extends Component {
    state = {
        user: {
            firstname: '',
            lastname: '',
            username: '',
        },
        userExists: false
    }

    accoutExists(currUsername) {
        const users = this.props.users
        for (let user of users) {
            if (user.username === currUsername)
                return true
        }
        return false
    }

    handleAddUser = event => {
        event.preventDefault()
        const userExists = this.accoutExists(this.state.user.username)
        if (!userExists) {
            this.props.addUser(this.state.user)
        }
        this.setState(() => ({
            userExists,
        }))
    }

    isFormEmpty = () => {
        return (this.state.user.firstname === '' || this.state.user.lastname === '' || this.state.user.user === '')
    }

    updateState = event => {
        const { name, value } = event.target
        this.setState(prevState => ({
            ...prevState,
            user: {
                ...prevState.user,
                [name]: value
            }
        }))
    }

    render() {
        const { firstname, lastname, username } = this.state.user
        return (
            <div>
                <form>
                    <input type="text" onChange={this.updateState} placeholder="Enter First Name" value={firstname} name="firstname" />
                    <input type="text" onChange={this.updateState} placeholder="Enter Last Name" value={lastname} name="lastname" />
                    <input type="text" onChange={this.updateState} placeholder="Enter Username" value={username} name="username" />
                    <button onClick={this.handleAddUser} disabled={this.isFormEmpty()}>Add User</button>
                </form>
                {this.state.userExists ?
                    <p>Another accout exists with same username.</p> :
                    ''}
            </div>
        )
    }
}

export default AddUser