import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class RenderBooks extends Component {
    state = {
        shelf: this.props.shelf
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
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select value={shelf} >
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors[0]}</div>
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

class ListBooks extends Component {
    state = {
        Books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(Books => {
            this.setState(() => ({
                Books
            }))
            console.log(this.state.Books)
        })
    }
    render() {
        const Books = this.state.Books
        const shelf = ["currentlyReading", "wantToRead", "read"]
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div >
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <RenderBooks Books={Books} shelf={shelf[0]} />
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want To Read</h2>
                            <div className="bookshelf-books">
                                <RenderBooks Books={Books} shelf={shelf[1]} />
                            </div>
                        </div><div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <RenderBooks Books={Books} shelf={shelf[2]} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div >
        )
    }
}

export default ListBooks