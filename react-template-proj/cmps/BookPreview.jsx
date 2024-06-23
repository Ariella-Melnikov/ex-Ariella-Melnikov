export function BookPreview({ book }) {

    const { title, amount } = book
    return (
        <article className="book-preview">
            <h2>Title: {book.title}</h2>
            <h4>Book Price: {book.amount}</h4>
            {/* <img src={`../assets/img/${car.vendor}.png`} alt="" /> */}
        </article>
    )
}