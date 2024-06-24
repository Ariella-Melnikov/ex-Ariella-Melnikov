import { BookPreview } from "./BookPreview.jsx"
// const { useState } = React

export function BookList({ books, onRemoveBook, onSelectBookId }) {
  if (!books) return <div>No books available</div>

  return (
    <section className='books-lst-container'>
      {books.map((book) => (
        <div
          key={book.id}
          className='book-card'>
          <BookPreview book={book} />
          <button onClick={() => onRemoveBook(book.id)}>Remove</button>
          <button onClick={() => onSelectBookId(book.id)}>Details</button>
        </div>
      ))}
    </section>
  )
}
