
const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx"
// const { useState } = React

export function BookList({ books, onRemoveBook }) {
  if (!books) return <div>No books available</div>

  return (
    <section className='books-lst-container'>
      {books.map((book) => (
        <div
          key={book.id}
          className='book-card'>
          <BookPreview book={book} />
          <button onClick={() => onRemoveBook(book.id)}>Remove</button>
          <button><Link to={`/books/${book.id}`}>Details</Link></button>
          <button><Link to={`/books/edit/${book.id}`}>Edit</Link></button>
        </div>
      ))}
    </section>
  )
}
