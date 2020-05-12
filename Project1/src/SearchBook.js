import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {
    state = {
        addedBooks: [],
        searchResult: [],
        Books: [],
        flag: true
    }

    componentDidMount() {
        BooksAPI.getAll().then(Books => {
            const addedBooks = Books.map(book => book.id)
            this.setState((prevState) => ({
                ...prevState,
                addedBooks,
                Books
            }))
        })
    }

    handleSearch = debounce((searchInput) => {
        const maxResults = 15
        if (searchInput !== '') {
            BooksAPI.search(searchInput, maxResults)
                .then(res => this.setState(prevState => ({
                    ...prevState,
                    searchResult: res,
                    flag: res.length > 0 ? true : false
                })))
        } else {
            this.setState(prevState => ({
                ...prevState,
                searchResult: [],
                flag: true
            }))
        }
    }, 1000)

    addBook = (name, value) => {
        let updateBook = this.state.searchResult[name]
        BooksAPI.update(updateBook, value)
    }

    render() {
        const searchRes = this.state.searchResult
        const { addedBooks, Books, flag } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input onChange={event => this.handleSearch(event.target.value)} type="text" placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    {flag ? (<ol className="books-grid">
                        {searchRes.length > 0 ? (
                            searchRes.map((book, index) => {
                                return (
                                    <li key={index}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${"imageLinks" in book ? book.imageLinks.smallThumbnail : ''})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select
                                                        onChange={event => this.addBook(event.target.name, event.target.value)}
                                                        value={addedBooks.indexOf(book.id) === -1 ?
                                                            "none" : Books[addedBooks.indexOf(book.id)].shelf}
                                                        name={index}
                                                    >
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
                            })
                        ) : "Search a book"}
                    </ol>) : <h1 style={{ textAlign: "center", color: "red" }}>No Result Found</h1>}
                </div>
            </div>
        )
    }
}

export default SearchBook