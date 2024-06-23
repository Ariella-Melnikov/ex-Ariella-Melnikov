const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // function handleTxtChange({ target }) {
    //     const { value } = target
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
    // }

    // function handleMinSpeedChange({ target }) {
    //     const { value } = target
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, minAmount: +value }))
    // }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt, minAmount } = filterByToEdit

    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Title</label>
                <input value={txt} onChange={handleChange} name="txt" type="text" id="txt" />

                <label htmlFor="minAmount">Min amount</label>
                <input value={minAmount || ''} onChange={handleChange} name="minAmount" type="number" id="minAmount" />

                <button>Submit</button>
            </form>
        </section>
    )
}