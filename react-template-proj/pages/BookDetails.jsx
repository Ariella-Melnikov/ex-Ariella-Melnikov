import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

const { useEffect, useState } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => console.error('Error loading book:', err))
    }, [bookId])

    function getReadingType(pageCount) {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Descent Reading'
        if (pageCount < 100) return 'Light Reading'
        return ''
    }

    function getPublishedDate(publishedDate) {
        const currentYear = new Date().getFullYear()
        const bookYear = new Date(publishedDate).getFullYear()
        const yearDifference = currentYear - bookYear

        if (yearDifference > 10 ) return 'Vintage'
        if (yearDifference < 1 ) return 'New'
    }

    function getPriceColor(amount) {
        if (amount > 150) return {color: 'red' , fontWeight: 'bold'}
        if (amount < 20) return {color: 'green' , fontWeight: 'bold'}
        return {}
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
          <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <p><strong>Author:</strong> {book.authors.join(', ')}</p>
            <p><strong>Published Date:</strong> {book.publishedDate} ({getPublishedDate(book.publishedDate)})</p>
            <p><strong>Description:</strong> {book.description} <LongTxt txt={book.description} /> </p>
            <p><strong>Page Count:</strong> {book.pageCount} ({getReadingType(book.pageCount)})</p>
            <p><strong>Categories:</strong> {book.categories.join(', ')}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <p><strong>amount:</strong>
            <span style={getPriceColor(book.listPrice.amount)}>
             {book.listPrice.amount} {book.listPrice.currencyCode} 
             {book.listPrice.isOnSale && <span className="on-sale-sign">(On Sale!)</span>}
             </span></p>
            <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
            <button onClick={onBack}>Back</button>
        </section>
    )
}