const { useState } = React
import { bookService } from '../services/book-service.js'

export function AddReview({ bookId, onAddReview }) {
  const [review, setReview] = useState({ fullname: '', rating: 1, readAt: '' })

  function handleChange({ target }) {
    const { name, value } = target
    setReview((prevReview) => ({ ...prevReview, [name]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    bookService
      .addReview(bookId, review)
      .then(onAddReview)
      .catch((err) => console.error('Error adding review:', err))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Fullname:
        <input type='text' name='fullname' value={review.fullname} onChange={handleChange} required />
      </label>

      <label>
        Rating:
        <select name='rating' value={review.rating} onChange={handleChange} required>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label>
        Read At:
        <input type='date' name='readAt' value={review.readAt} onChange={handleChange} required />
      </label>

      <button type='submit'>Add Review</button>
    </form>
  )
}
