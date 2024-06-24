const {useEffect} = React
const {Link, NavLink, useNavigate} = ReactRouterDOM

export function AppHeader({onSetPage}) {
  const navigate = useNavigate()
  useEffect(() => {
    return () => {}
  }, [])

  function onBack() {
    navigate(-1)
  }

  return (
    <div className='app-header'>
      <section>
      <div className='logo' onClick={(ev) => { onSetPage(ev, "home")}}> Ariella's Book Shop </div>
      <section>
        <button onClick={onBack}>Back</button>
      </section>
        <nav className="nav-bar">
         <NavLink to="/home">Home</NavLink>
         <NavLink to="/about">About</NavLink>
         <NavLink to="/books">Books</NavLink>
       </nav>
     </section>
     </div>
  )
}
