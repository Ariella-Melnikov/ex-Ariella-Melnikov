import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { books as staticBooks } from './books.js'

const BOOK_KEY = 'bookDB'

export const bookService = {
  query,
  getById,
  remove,
  save,
  getEmptyBook,
  getNextBookId,
  getPreviousBookId,
  getFilterBy,
  setFilterBy,
  getDefaultFilter,
  addReview,
  deleteReview,
  addGoogleBook,
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (!books || !books.length) {
      books = staticBooks.map((book) => ({
        ...book,
        reviews: _generateInitialReviews(),
      }))
      utilService.saveToStorage(BOOK_KEY, books)
    }
    if (filterBy.title) {
      const regex = new RegExp(filterBy.title, 'i')
      books = books.filter((book) => regex.test(book.title))
    }
    if (filterBy.price) {
      books = books.filter((book) => book.listPrice.amount <= filterBy.price)
    }
    return books
  })
}

function getById(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    const newBook = _createBook(book.title, book.amount)
    return storageService.post(BOOK_KEY, newBook)
  }
}

//   function getEmptyBook() {
//     return { title: "", amount: "" }
//   }

function getEmptyBook() {
  return {
    id: '',
    title: '',
    subtitle: '',
    authors: [],
    publishedDate: 0,
    description: '',
    pageCount: 0,
    categories: [],
    thumbnail: '',
    language: 'en',
    listPrice: {
      amount: 0,
      currencyCode: 'USD',
      isOnSale: false,
    },
  }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
  if (filterBy.minAmount !== undefined) gFilterBy.minAmount = filterBy.minAmount
  return gFilterBy
}

function getDefaultFilter() {
  return { txt: '', minAmount: '' } // Example default filter values
}

function getNextBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let nextBookIdx = books.findIndex((book) => book.id === bookId) + 1
    if (nextBookIdx === books.length) nextBookIdx = 0
    return books[nextBookIdx].id
  })
}

function getPreviousBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let prevBookIdx = books.findIndex((book) => book.id === bookId) - 1
    if (prevBookIdx < 0) prevBookIdx = books.length - 1
    return books[prevBookIdx].id
  })
}

function _createBook(title, amount) {
  const randomIndex = utilService.getRandomIntInclusive(1, 20)
  return {
    id: utilService.makeId(),
    title,
    subtitle: utilService.makeLorem(15),
    authors: ['Duna elle'],
    publishedDate: utilService.getRandomIntInclusive(1700, 2022),
    description: utilService.makeLorem(50),
    pageCount: utilService.getRandomIntInclusive(1, 700),
    categories: ['Computers', 'Hack'],
    thumbnail: `https://www.coding-academy.org/books-photos/${randomIndex}.jpg`,
    language: 'en',
    listPrice: {
      amount,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  }
}

function addReview(bookId, review) {
  return getById(bookId).then((book) => {
    if (!book.reviews) book.reviews = []
    review.id = utilService.makeId()
    book.reviews.push(review)
    return save(book)
  })
}

function deleteReview(bookId, reviewId) {
  return getById(bookId).then((book) => {
    book.reviews = book.reviews.filter((review) => review.id !== reviewId)
    return save(book)
  })
}

function _generateInitialReviews() {
  return [
    {
      id: utilService.makeId(),
      fullname: utilService.getRandomName(),
      rating: utilService.getRandomIntInclusive(1, 5),
      readAt: _getRandomReviewDate(),
    },
    {
      id: utilService.makeId(),
      fullname: utilService.getRandomName(),
      rating: utilService.getRandomIntInclusive(1, 5),
      readAt: _getRandomReviewDate(),
    },
    {
      id: utilService.makeId(),
      fullname: utilService.getRandomName(),
      rating: utilService.getRandomIntInclusive(1, 5),
      readAt: _getRandomReviewDate(),
    },
  ]
}

function _getRandomReviewDate() {
  const start = new Date(2021, 0, 1).getTime()
  const end = new Date(2023, 0, 1).getTime()
  const randomDate = new Date(utilService.getRandomIntInclusive(start, end))
  return randomDate.toISOString().split('T')[0]
}

function addGoogleBook(googleBook) {
  const book = {
    id: utilService.makeId(),
    title: googleBook.title,
    subtitle: googleBook.subtitle || '',
    authors: googleBook.authors || [],
    publishedDate: googleBook.publishedDate || 0,
    description: googleBook.description || '',
    pageCount: googleBook.pageCount || 0,
    categories: googleBook.categories || [],
    thumbnail: googleBook.imageLinks ? googleBook.imageLinks.thumbnail : '',
    language: googleBook.language || 'en',
    listPrice: {
      amount: googleBook.saleInfo && googleBook.saleInfo.listPrice ? googleBook.saleInfo.listPrice.amount : 0,
      currencyCode:
        googleBook.saleInfo && googleBook.saleInfo.listPrice ? googleBook.saleInfo.listPrice.currencyCode : 'USD',
      isOnSale: (googleBook.saleInfo && googleBook.saleInfo.isOnSale) || false,
    },
    reviews: [],
  }
  return storageService.post(BOOK_KEY, book)
}

// function _createBooks() {
//     let books = utilService.loadFromStorage(BOOK_KEY)
//     if (!books || !books.length) {
//         books = []
//         books.push(_createBook('metus hendrerit', 109, "http://coding-academy.org/books-photos/20.jpg"))
//         books.push(_createBook('morbi', 129, "http://coding-academy.org/books-photos/14.jpg"))
//         books.push(_createBook('at viverra venenatis', 108, "http://coding-academy.org/books-photos/2.jpg"))
//         books.push(_createBook('dictum', 30, "http://coding-academy.org/books-photos/16.jpg"))
//         utilService.saveToStorage(BOOK_KEY, books)
//     }
// }

// function _createBook(title, amount, thumbnail = '', currencyCode = 'USD', isOnSale = false ) {
//     const book = getEmptyBook(title, amount, currencyCode, isOnSale, thumbnail);
//     book.id = utilService.makeId();
//     return book;
// }

// function _createBooks() {
//     const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
//     const books = []
//     for (let i = 0; i < 20; i++) {
//         const book = {
//             id: utilService.makeId(),
//             title: utilService.makeLorem(2),
//             subtitle: utilService.makeLorem(4),
//             authors: [
//                 utilService.makeLorem(1)
//             ],
//             publishedDate: utilService.getRandomIntInclusive(1950, 2024),
//             description: utilService.makeLorem(20),
//             pageCount: utilService.getRandomIntInclusive(20, 600),
//             categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
//             thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
//             language: "en",
//             listPrice: {
//                 amount: utilService.getRandomIntInclusive(80, 500),
//                 currencyCode: "EUR",
//                 isOnSale: Math.random() > 0.7
//             }
//         }
//         books.push(book)
//     }
//     console.log('books', books)
// }

function _initializeBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = staticBooks
    utilService.saveToStorage(BOOK_KEY, books)
  }
}
