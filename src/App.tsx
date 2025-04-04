import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Login from './assets/pages/login/Login'
import NgoViewEdit from './assets/pages/NgoViewEdit'
import NgoView from './assets/pages/NgoView'
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/transparencia-editar' element={<NgoViewEdit/>}/>
          <Route path='/transparencia/:id' element={<NgoView/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
