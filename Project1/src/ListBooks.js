import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

class ListBooks extends Component {
    state = {
        Books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(Books => {
            this.setState(() => ({
                Books
            }))
        })
    }

    handleChange = (name, value) => {
        let updateBook = this.state.Books[name]
        BooksAPI.update(updateBook, value)
            .then(() => {
                updateBook.shelf = value
                let addedBooks = this.state.Books.filter(book => book.id !== updateBook.id)
                addedBooks.push(updateBook)
                this.setState({ Books: addedBooks })
            })
    }

    render() {
        const Books = this.state.Books
        const shelf = ["currentlyReading", "wantToRead", "read"]
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <Shelf handleChange={this.handleChange} Books={Books} shelf={shelf[0]} />
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want To Read</h2>
                            <div className="bookshelf-books">
                                <Shelf handleChange={this.handleChange} Books={Books} shelf={shelf[1]} />
                            </div>
                        </div><div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <Shelf handleChange={this.handleChange} Books={Books} shelf={shelf[2]} />
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