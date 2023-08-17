import Home from "./pages/home/Home";
import Signin from "./pages/Login/Signin";
import Signup from "./pages/Signup/Signup";
import ProtectRoute from "./pages/Protected/ProtectRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import ExportScreen from "./components/ExportScreen/ExportScreen";
import Datatable from "./components/datatable/Datatable";
import List from "./pages/list/List";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectRoute>
                  <Home />
                </ProtectRoute>
              }
            />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Signin />} />
            <Route
              path="create_template"
              element={
                <ProtectRoute>
                  <ExportScreen />
                </ProtectRoute>
              }
            />
            <Route path="users" element={<List />} />
            <Route
              path="render-template/:templateId"
              element={
                <ProtectRoute>
                  <ExportScreen />
                </ProtectRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
