import React, { Component } from 'react'
import AddMessage from './AddMessage'

class ChatWindow extends Component {

    render() {
        const user = this.props.user
        const messages = this.props.messages
        return (
            <div className="chat-window">
                <h2>Super Awesome Chat</h2>
                <div className="name sender">{user}</div>

                <ul className="message-list">
                    {messages.map((message, index) => (
                        <li
                            key={index}
                            className={
                                message.username === user ? 'message sender' : 'message recipient'
                            }
                        >
                            <p>{`${message.username}: ${message.text}`}</p>
                        </li>
                    ))}
                </ul>
                <AddMessage addMsg={this.props.addMsg} user={user} />
            </div>
        )
    }
}

export default ChatWindow