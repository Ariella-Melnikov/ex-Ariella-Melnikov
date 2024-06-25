const { useState, useEffect } = React
import { bookService } from '../services/book-service.js'
import { googleBookService } from '../services/googleBook-service.js'
import { useDebounce } from '../cmps/UseDebounce.jsx'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function BookAdd() {
  const [searchTerm, setSearchTerm] = useState('')
  const [books, setBooks] = useState([])
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      googleBookService.query(debouncedSearchTerm).then((results) => {
        setBooks(results)
      })
    } else {
      setBooks([])
    }
  }, [debouncedSearchTerm])

  function handleChange(event) {
    setSearchTerm(event.target.value)
  }
  // function handleSearch() {
  //   googleBookService.query(searchTerm).then((results) => {
  //     setBooks(results)
  //   })
  // }

  function addBook(book) {
    bookService.addGoogleBook(book).then(() => {
      showSuccessMsg(`${book.title} added to the library!`)
    })
  }

  return (
    <div>
    <h2>Add a Book</h2>
    <input type="text" value={searchTerm} onChange={handleChange} />
    <ul>
      {books.map(book => (
        <li key={book.id}>
          {book.title} <button onClick={() => addBook(book)}>+</button>
        </li>
      ))}
    </ul>
  </div>
);
}
