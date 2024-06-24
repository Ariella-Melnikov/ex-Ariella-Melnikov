const { Link } = ReactRouterDOM
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book-service.js'
import { BookDetails } from './BookDetails.jsx'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const { useEffect, useState } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
    console.log('filterBy', filterBy)
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => {
        console.log('err:', err)
      })
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((currentBooks) => currentBooks.filter((book) => book.id !== bookId))
        showSuccessMsg(`Book (${bookId}) removed successfully!`)
      })
      .catch((err) => {
        console.log('Problems deleting book:', err)
        showErrorMsg(`Having problems removing book!`)
      })
  }

  function onSetFilter(filterBy) {
    setFilterBy({ ...filterBy })
  }

  if (!books) return <div>Loading...</div>

  return (
    <section className='book-index'>
      <button>
        <Link to='/books/edit'>Add Book</Link>
      </button>
      <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  )
}
