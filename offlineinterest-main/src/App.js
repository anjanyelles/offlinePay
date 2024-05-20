import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin1 from "./views/auth/signin/SignIn1";
import AdminLayout from "./layouts/AdminLayout";
import DashDefault from "./views/dashboard";
import Profile from "./views/dashboard/Profile";
import MyInvestment from "./views/dashboard/MyInvestment";

function App() {
  return (
<>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin1 />}></Route>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<DashDefault />} />
            <Route path="myInvestment" element={<MyInvestment />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>{renderRoutes(routes)}</BrowserRouter> */}
      </>
  );
}

export default App;
