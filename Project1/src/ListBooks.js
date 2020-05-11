import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class CurrentlyReading extends Component {
    state = {
        shelf: "currentlyReading"
    }

    render() {
        const Books = this.props.Books
        const shelf = this.state.shelf
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
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
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

class WantToRead extends Component {
    state = {
        shelf: "wantToRead"
    }

    render() {
        const Books = this.props.Books
        const shelf = this.state.shelf
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {Books.map((book, index) => {
                            if (book.shelf === shelf) {
                                return (
                                    <li key={index}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select value={shelf}>
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
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

class Read extends Component {
    state = {
        shelf: "read"
    }

    render() {
        const Books = this.props.Books
        const shelf = this.state.shelf
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {Books.map((book, index) => {
                            if (book.shelf === shelf) {
                                return (
                                    <li key={index}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select value={shelf}>
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
                        })}
                    </ol>
                </div>
            </div>
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
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div >
                <div className="list-books-content">
                    <div>
                        <CurrentlyReading Books={Books} />
                        <WantToRead Books={Books} />
                        <Read Books={Books} />
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