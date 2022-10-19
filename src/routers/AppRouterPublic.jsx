
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '../pages/Admin'

//Rutas publicas
import * as Pages from '../pages'
function AppRouterPublic() {
  return (
        <Routes>
            <Route exact path="/" element={<Pages.HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="*" element={<Pages.NotFoundPage />}></Route>
        </Routes>
  )
}

export default AppRouterPublic