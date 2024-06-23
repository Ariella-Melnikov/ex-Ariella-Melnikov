import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React


export function BookIndex() {

    const [books, setbooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(books => setbooks(books))
            .catch(err => {
                console.log('err:', err)
            })
    }

if (!books) return <div>Loading...</div>
    return (
        <section>
            <h2>Book Index</h2>
            <BookList
                books={books}
                onRemoveBook={(bookId) => console.log('Remove book', bookId)}
                onSelectBookId={(bookId) => setSelectedBookId(bookId)}
            />
        </section>
    )
} 