const { useParams, Link } = ReactRouterDOM
import { LongTxt } from '../cmps/LongTxt.jsx'
import { bookService } from '../services/book-service.js'
import { AddReview } from '../cmps/AddReview.jsx'

const { useEffect, useState } = React

export function BookDetails() {
  const [book, setBook] = useState(null)
  const [nextBookId, setNextBookId] = useState(null)
  const [prevBookId, setPrevBookId] = useState(null)
  const { bookId } = useParams()

  useEffect(() => {
    bookService.getById(bookId).then((book) => setBook(book))

    bookService.getNextBookId(bookId).then((nextId) => setNextBookId(nextId))

    bookService.getPreviousBookId(bookId).then((prevId) => setPrevBookId(prevId))
  }, [bookId])

  function handleAddReview() {
    bookService.getById(bookId).then((book) => setBook(book))
  }

  function handleDeleteReview(reviewId) {
    bookService.deleteReview(bookId, reviewId).then(() => {
      setBook((prevBook) => ({
        ...prevBook,
        reviews: prevBook.reviews.filter((review) => review.id !== reviewId),
      }))
    })
  }

  function getBookLng(lng) {
    switch (lng) {
      case 'he':
        return 'Hebrew'
        break
      case 'sp':
        return 'Spanish'
        break
      default:
        return 'English'
        break
    }
  }

  function getReadingType(pageCount) {
    if (pageCount > 500) return ' - Serious Reading'
    if (pageCount > 100) return ' - Descent Reading'
    if (pageCount < 100) return ' - Light Reading'
    return ' '
  }

  function getPublishedDate() {
    const currentYear = new Date().getFullYear()
    const bookYear = book.publishedDate
    const yearDifference = currentYear - bookYear

    if (yearDifference > 10) return ' - Vintage'
    if (yearDifference < 1) return ' - New'
  }

  function getPriceColor(amount) {
    if (amount > 150) return { color: 'red', fontWeight: 'bold' }
    if (amount < 20) return { color: 'green', fontWeight: 'bold' }
    return {}
  }

  if (!book) return <div>Loading...</div>

  return (
    <section className='book-details-container'>
      <div className='book-details-title'>{book.title}</div>
      <div className='book-details-subtitle'>{book.subtitle}</div>
      <div className='book-thumbnail-container'>
        {book.listPrice.isOnSale && <div className='book-details-on-sale'>On-sale!</div>}
        <img src={book.thumbnail} />
      </div>
      <div className='book-details-info'>
        <div className='book-details-info-row'>
          <span className='book-details-info-title'>Year publish:</span>
          <span className='book-details-info-text'>{getPublishedDate()}</span>
        </div>

        <div className='book-details-info-row'>
          <span className='book-details-info-title'>Author{book.authors.length > 1 ? 's' : ''}:</span>
          <span className='book-details-info-text'>{book.authors.toString()}</span>
        </div>

        <div className='book-details-info-row'>
          <span className='book-details-info-title'>Language:</span>
          <span className='book-details-info-text'>{getBookLng(book.language)}</span>
        </div>

        <div className='book-details-info-row'>
          <span className='book-details-info-title'>Categories:</span>
          <span className='book-details-info-text'>{book.categories.toString()}</span>
        </div>

        <div className='book-details-info-row'>
          <span className='book-details-info-title'>Pages:</span>
          <span className='book-details-info-text'>{getReadingType(book.pageCount)}</span>
        </div>

        <div className='book-details-info-row'>
          <span className='book-details-info-title'>Price:</span>
          <span className={'book-details-info-text ' + getPriceColor(book.listPrice.amount)}>
            for only {book.listPrice.amount}
          </span>
        </div>

        <div className='actions-btns'>
          <button className='go-back-btn'>
            <Link to='/books'>⬅ Go back</Link>
          </button>
        </div>
      </div>

      <div className='book-details-info-row'>
        <span className='book-details-info-title'>Description:</span>
        <LongTxt txt={book.description} />
      </div>

      <div className='book-reviews'>
        <h2>Reviews:</h2>
        <ul>
          {book.reviews &&
            book.reviews.map((review) => (
              <li key={review.id}>
                <p>
                  <strong>Fullname:</strong> {review.fullname}
                </p>
                <p>
                  <strong>Rating:</strong> {review.rating}
                </p>
                <p>
                  <strong>Read At:</strong> {review.readAt}
                </p>
                <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>

      <AddReview bookId={bookId} onAddReview={handleAddReview} />

      <div className='navigation-links flex justify-between'>
        {prevBookId && <Link to={`/books/${prevBookId}`} className="button">Previous Book</Link>} 
        {nextBookId && <Link to={`/books/${nextBookId}`} className="button">Next Book</Link>}
      </div>
    </section>
  )
}
// { <section className="book-details">
//   <h1>{book.title}</h1>
//     <h2>{book.subtitle}</h2>
//     <p><strong>Author:</strong> {book.authors.join(', ')}</p>
//     <p><strong>Published Date:</strong> {book.publishedDate} ({getPublishedDate(book.publishedDate)})</p>
//     <p><strong>Description:</strong> {book.description} <LongTxt txt={book.description} /> </p>
//     <p><strong>Page Count:</strong> {book.pageCount} ({getReadingType(book.pageCount)})</p>
//     <p><strong>Categories:</strong> {book.categories.join(', ')}</p>
//     <p><strong>Language:</strong> {book.language}</p>
//     <p><strong>amount:</strong>
//     <span style={getPriceColor(book.listPrice.amount)}>
//      {book.listPrice.amount} {book.listPrice.currencyCode}
//      {book.listPrice.isOnSale && <span className="on-sale-sign">(On Sale!)</span>}
//      </span></p>
//     <img src={book.thumbnail} alt={`Cover of ${book.title}`} />
//     <button onClick={onBack}>Back</button>
// </section> }
