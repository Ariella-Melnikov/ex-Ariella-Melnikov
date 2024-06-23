export function BookPreview({ book }) {

    const { title, listPrice, thumbnail  } = book
    console.log('thumbnail', thumbnail)
    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h4>Book Price: {listPrice.amount}</h4>
            <img src={thumbnail} alt={`Cover of ${title}`} />
        </article>
    )
}