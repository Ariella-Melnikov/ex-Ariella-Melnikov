import { BookPreview } from "./BookPreview.jsx"
// const { useState } = React

export function BookList({ books, onRemoveBook, onSelectBookId }) {
    
    if (!books) return <div>No books available</div>

    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                        <button onClick={() => onSelectBookId(book.id)}>Details</button>
                    </section>
                </li>
            )}
        </ul>
    )
}