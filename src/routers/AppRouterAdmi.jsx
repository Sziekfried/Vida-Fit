import { Routes, Route } from "react-router-dom";
import * as Admin from "../pages/Admin";
import * as Pages from "../pages";

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
      <Route path="/edit-membresias" element={<Admin.MembershipPage />} />
      <Route path="/edit-events" element={<Admin.EditEvent/>} />
      <Route path="/login" element={<Admin.LoginPage />}></Route>
      <Route path="/logout" element={<Admin.LogoutPage />}></Route>
      <Route path="*" element={<Pages.NotFoundPage />}></Route>
    </Routes>
  );
}

export default AppRouterAdmi;
