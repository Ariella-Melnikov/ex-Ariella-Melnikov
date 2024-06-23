export function BookPreview({ book }) {

    const { title, listPrice, thumbnail  } = book
    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h4>Book amount: {listPrice.amount}</h4>
            <img src={thumbnail} alt={`Cover of ${title}`} />
        </article>
    )
}