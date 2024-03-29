import { Routes, Route } from "react-router-dom";
import * as Admin from "../pages/Admin";
import * as Pages from "../pages";


//Aqui estan todas las rutas de administrador, a las cuales solo se puede acceder si se usa este enrutador 
function AppRouterAdmi() {
  return (
    <Routes>
      <Route exact path="/" element={<Pages.HomePage />}></Route>
      <Route exact path="/home-admi" element={<Admin.Home />} />
      <Route exact path="/clientes" element={<Admin.Clients />} />
      <Route
        exact
        path="/visita-cliente"
        element={<Admin.RegisterVisitClientPage />}
      />
      <Route exact path="/new-client" element={<Admin.SubscribeClientPage />} />
      <Route exact path="/edit-client/:id" element={<Admin.EditClient />} />
      <Route path="/edit-membresias" element={<Admin.MembershipPage />} />
      <Route path="/edit-membresias/:id" element={<Admin.FormEditMembership />} />
      <Route path="/edit-events" element={<Admin.EditEvent/>} />
      <Route path="/edit-events/:id" element={<Admin.FormEditEvent/>} />
      <Route path="/login" element={<Admin.LoginPage />}></Route>
      <Route path="/logout" element={<Admin.LogoutPage />}></Route>
      <Route path="*" element={<Pages.NotFoundPage />}></Route>
    </Routes>
  );
}

export default AppRouterAdmi;
