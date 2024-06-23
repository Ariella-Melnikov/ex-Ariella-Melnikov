import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { txt: '', minAmount: 0 }
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyCar: getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.minAmount) {
                books = books.filter(book => book.maxAmount >= gFilterBy.minAmount)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', amount = 0, currencyCode = 'USD', isOnSale = false,  thumbnail = '') {
    return {
        id: '',
        title,
        listPrice: {
            amount,
            currencyCode,
            isOnSale
        },
        thumbnail,
    };
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minAmount !== undefined) gFilterBy.minAmount = filterBy.minAmount
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextBookIdx === books.length) nextBookIdx = 0
            return books[nextBookIdx].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('metus hendrerit', 109, "http://coding-academy.org/books-photos/20.jpg"))
        books.push(_createBook('morbi', 129, "http://coding-academy.org/books-photos/14.jpg"))
        books.push(_createBook('at viverra venenatis', 108, "http://coding-academy.org/books-photos/2.jpg"))
        books.push(_createBook('dictum', 30, "http://coding-academy.org/books-photos/16.jpg"))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, amount, thumbnail = '', currencyCode = 'USD', isOnSale = false ) {
    const book = getEmptyBook(title, amount, currencyCode, isOnSale, thumbnail);
    book.id = utilService.makeId();
    return book;
}