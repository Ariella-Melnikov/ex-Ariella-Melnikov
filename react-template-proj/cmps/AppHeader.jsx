export function AppHeader({ onSetPage }) {
    return (
      <section className='app-header'>
        <div className='logo' onClick={(ev) => {
          onSetPage(ev, 'home')
        }}>
          Ariella's Book Shop
        </div>
        <nav className='nav-bar'>
          <a href='' onClick={(ev) => {
            onSetPage(ev, 'home')
          }}>
            Home
          </a>
          <a href='' onClick={(ev) => {
            onSetPage(ev, 'book')
          }}>
            Books
          </a>
          <a href='' onClick={(ev) => {
            onSetPage(ev, 'about')
          }}        >
            About
          </a>
        </nav>
      </section>
    )
  }
  