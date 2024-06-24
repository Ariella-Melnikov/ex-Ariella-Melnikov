import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookEdit } from "./BookEdit.jsx"

const { useEffect, useState } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    loadBooks()
    console.log("filterBy", filterBy)
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => {
        console.log("err:", err)
      })
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((currentBooks) =>
          currentBooks.filter((book) => book.id !== bookId)
        )
      })
      .catch((err) => {
        console.log("Problems deleting book:", err)
      })
  }

  function onSetFilter(filterBy) {
    setFilterBy({ ...filterBy })
  }

  function onSelectBook(bookId) {
    bookService
      .getById(bookId)
      .then((book) => {
        setSelectedBook(book)
      })
      .catch((error) => console.error(error.message))
  }

  function onAddBook(bookToSave) {
    if (!bookToSave.title || !bookToSave.amount) return
    bookService.save(bookToSave).then((savedBook) => {
      setIsEdit(false)
      setBooks((prevBooks) => [savedBook, ...prevBooks])
    })
  }

  if (!books) return <div>Loading...</div>

  return (
    <main>
      <section className='book-index'>
        {!selectedBook && !isEdit && (
          <React.Fragment>
            <BookFilter
              filterBy={filterBy}
              onSetFilter={onSetFilter}
            />
            <button
              className='add-btn'
              onClick={() => setIsEdit(true)}>
              Add Book
            </button>
            {books.length && (
              <BookList
                books={books}
                onSelectBook={onSelectBook}
                onRemoveBook={onRemoveBook}
              />
            )}
          </React.Fragment>
        )}

        {selectedBook && (
          <BookDetails
            onBack={() => setSelectedBook(null)}
            book={selectedBook}
          />
        )}
      </section>
      {isEdit && (
        <BookEdit
          onAddBook={onAddBook}
          onCancelEdit={() => setIsEdit(false)}
        />
      )}
    </main>
  )
}
