import { Route, Routes, Navigate } from "react-router-dom";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import Account from "./Components/Account/Account";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && <Route path="/" exact element={<Account />} />}
      <Route path="/login" exact element={<LoginRegister />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />

      <Route path="/account" element={<Account />} />
      {/* This route will be deleted after user can be reach, after development */}
    </Routes>
  );
}

export default App;
