function NavBar() {
    return (
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.5rem 1rem',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <a href="#" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#212529',
            fontWeight: 'bold',
            fontSize: '1.25rem'
          }}>
            <img
              src="./src/assets/logo_prov.png"
              width="50"
              height="50"
              style={{
                display: 'inline-block',
                verticalAlign: 'top',
                marginRight: '0.5rem'
              }}
              alt="" 
            />
            Strives
          </a>
        </nav>
      )
}
export default NavBar