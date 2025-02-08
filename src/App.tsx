import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Login from './assets/pages/Login'
import NgoViewEdit from './assets/pages/NgoViewEdit'
import NgoView from './assets/pages/NgoView'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/transparencia-editar' element={<NgoViewEdit/>}/>
          <Route path='/transparencia' element={<NgoView/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
