interface NavBarProps{
    brandName: string;
    logoPath: string;
}

function NavBar({brandName, logoPath}: NavBarProps) {
    return (
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
              src={logoPath}
              width="50"
              height="50"
              style={{
                display: 'inline-block',
                verticalAlign: 'top',
                marginRight: '0.5rem'
              }}
              alt="" 
            />
            <span style={{
              fontWeight: 'bolder',
              fontSize: '1.5rem'
            }}>
              {brandName}
            </span>
          </a>
          <button
            type="button"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '40px',
              height: '24px',
              padding: '0.25rem 0.75rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            aria-label="Toggle navigation"
          >
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%'
            }}>
              {/* Les trois lignes du hamburger */}
              <span style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '2px',
                backgroundColor: '#212529'
              }}></span>
              <span style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                width: '100%',
                height: '2px',
                backgroundColor: '#212529',
                transform: 'translateY(-50%)'
              }}></span>
              <span style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                height: '2px',
                backgroundColor: '#212529'
              }}></span>
            </div>
          </button>
        </nav>
      )
}

export default NavBar