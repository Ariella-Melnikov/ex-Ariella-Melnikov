import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => console.error('Error loading book:', err))
    }, [bookId])

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
          <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <p><strong>Author:</strong> {book.authors.join(', ')}</p>
            <p><strong>Published Date:</strong> {book.publishedDate}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Page Count:</strong> {book.pageCount}</p>
            <p><strong>Categories:</strong> {book.categories.join(', ')}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <p><strong>amount:</strong> {book.listPrice.amount} {book.listPrice.currencyCode} {book.listPrice.isOnSale && <span>(On Sale!)</span>}</p>
            <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
            <button onClick={onBack}>Back</button>
        </section>
    )
}