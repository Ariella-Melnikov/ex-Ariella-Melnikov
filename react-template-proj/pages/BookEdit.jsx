const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { bookService } from '../services/book-service.js'

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  const navigate = useNavigate()
  const { bookId } = useParams()

  useEffect(() => {
    if (bookId) loadBook()
  }, [])

//   function loadBook() {
//     bookService
//       .getById(bookId)
//       .then(setBookToEdit)
//       .catch((err) => console.log('err:', err))
//   }

function loadBook() {
    bookService
      .getById(bookId)
      .then(book => {
        if (!book.listPrice) {
          book.listPrice = { amount: 0, currencyCode: 'USD', isOnSale: false };
        }
        setBookToEdit(book);
      })
      .catch((err) => console.log('err:', err));
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    if (target.type === 'number') {
      value = +value
    }

    setBookToEdit((prevBook) => {
      if (field === 'amount') {
        return { ...prevBook, listPrice: { ...prevBook.listPrice, amount: value } }
      }
      return { ...prevBook, [field]: value }
    })
}    

    function onSaveBook(ev) {
      ev.preventDefault()
      bookService
        .save(bookToEdit)
        .then(() => {
          navigate('/books')
          showSuccessMsg(`Book saved successfully!`)
        })
        .catch((err) => console.log('err:', err))
    }

    const { title, listPrice } = bookToEdit
    const amount = listPrice ? listPrice.amount : ''

    return (
      <section className='book-edit'>
        <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
        <form onSubmit={onSaveBook}>
          <label htmlFor='title'>Title</label>
          <input onChange={handleChange} value={title} type='text' name='title' id='title' />

          <label htmlFor='amount'>Price</label>
          <input onChange={handleChange} value={amount} type='number' name='amount' id='amount' />

          <button>Save</button>
        </form>
      </section>
    )
  }

