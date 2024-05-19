import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthContext from "./Auth/AuthContext";
import { useState } from "react";
import { RouterProvider } from 'react-router';
import router from "./Routers/router";

function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
