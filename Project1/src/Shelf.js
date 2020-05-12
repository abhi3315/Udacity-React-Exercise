import React, { Component } from 'react'

class Shelf extends Component {
    state = {
        shelf: this.props.shelf,
    }

    render() {
        const Books = this.props.Books
        const shelf = this.state.shelf
        return (
            <ol className="books-grid">
                {Books.map((book, index) => {
                    if (book.shelf === shelf) {
                        return (
                            <li key={index}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${"imageLinks" in book ? book.imageLinks.smallThumbnail : ''})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select name={index} onChange={event => this.props.handleChange(event.target.name, event.target.value)} value={shelf} >
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{"authors" in book ? book.authors[0] : 'No Author Found'}</div>
                                </div>
                            </li>
                        )
                    }
                    return false
                })
                }
            </ol>
        )
    }
}

export default Shelf