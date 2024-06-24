export function BookPreview({ book }) {
    return (
      <article>
        <div className="book-card-select-book">
          <div className="book-card-title">{book.title}</div>
          <img src={book.thumbnail} className="book-card-thumbnail" />
        </div>
  
        <div className="book-card-details">
          <div className="book-card-detail">
            <span className="book-card-details-title">Author:</span>
            <span className="book-card-details-info">
              {book.authors.toString()}
            </span>
          </div>
  
          <div className="book-card-detail">
            <span className="book-card-details-title">Price:</span>
            <span className="book-card-details-info">
              {book.listPrice.amount.toLocaleString(undefined, {
                style: "currency",
                currency: book.listPrice.currencyCode,
              })}
            </span>
          </div>
        </div>
      </article>
    )
  }
  