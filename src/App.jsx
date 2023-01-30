import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "./services/Auth";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import PublicRoutes from "./pages/PublicRoutes";
import Footer from "./components/Dashboard/Footer";
import AuthContextProvider from "./services/AuthContext";

function App() {
  const [hideFooter] = useState(true);
  const auth = Auth();
  return (
    <AuthContextProvider value={auth}>
      <Routes>
        <Route path="/Dashboard/*" element={<ProtectedRoutes />} />
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
      {!hideFooter && <Footer />}
    </AuthContextProvider>
  );
}

export default App;
