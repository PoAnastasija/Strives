import NavBar from "./components/header/navbar.tsx"
import logo from "./assets/logo_prov.png"

function App() {
  return (
    <div>
      <NavBar
      brandName="Strives"
      logoPath={logo}/>
    </div>
  )
}
export default App