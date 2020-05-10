import React, { Component } from 'react'

class AddMessage extends Component {
    state = {
        username: this.props.user,
        text: ""
    }

    isDisabled = () => this.state.text === "" ? true : false

    handleInput = (event) => {
        const { value } = event.target

        this.setState(prevState => ({
            ...prevState,
            text: value
        }))
    }

    addNewmsg = (event) => {
        event.preventDefault()
        this.props.addMsg(this.state)
    }

    render() {
        const { text } = this.state
        return (
            <div>
                <form onSubmit={this.addNewmsg} className="input-group">
                    <input type="text" className="form-control" onChange={this.handleInput} value={text} placeholder="Enter your message..." />
                    <div className="input-group-append">
                        <button className="btn submit-button" disabled={this.isDisabled()}>
                            SEND
                            </button>
                    </div>
                </form>
            </div>
        )
    }

}

export default AddMessage