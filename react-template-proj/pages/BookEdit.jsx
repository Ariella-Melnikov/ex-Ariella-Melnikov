const { useState } = React
import { bookService } from "../services/book-service.js"

export function BookEdit({ onAddBook, onCancelEdit }) {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (field) {
            case "title":
                value = target.value
                break
            case "amount":
                value = +target.value || ""
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        onAddBook(bookToEdit)
    }

    return (
        <section className="book-edit">
            <h2 className="edit-book-header">Edit Book</h2>
            <div className="book-edit-container">
                <form onSubmit={onSaveBook}>
                    <div className="book-details-info">
                        <div>
                            <span className="book-details-info-title">Title:</span>
                            <input
                                type="text"
                                placeholder="Enter New Title"
                                name="title"
                                value={bookToEdit.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <span className="book-details-info-title">Price:</span>
                            <input
                                type="number"
                                placeholder="Set Price"
                                name="amount"
                                min="0"
                                onChange={handleChange}
                                value={bookToEdit.amount}
                                required
                            />
                        </div>

                        <div className="book-edit-actions-container">
                            <button className="save-edit-btn" type="submit">
                                Save ✔
                            </button>
                            <button className="cancel-edit-btn" onClick={onCancelEdit}>
                                Cancel ✖
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
