import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Login } from "./pages";
import "react-phone-input-2/lib/style.css";
import "./App.css";
import { Guest, Protected } from "./components";
function App() {
  const routes = [
    {
      link: "/",
      element: <Login />,
      isGuest: true,
    },
    {
      link: "/dashboard",
      element: <Dashboard />,
      isProtected: true,
    },
  ];
  return (
    <>
      <Router>
        <Routes>
          {routes.map((item, index) => {
            if (item.isProtected) {
              return (
                <Route
                  key={index}
                  path={item.link}
                  element={<Protected>{item.element}</Protected>}
                />
              );
            } else if (item.isGuest) {
              <Route
                key={index}
                path={item.link}
                element={<Guest>{item.element}</Guest>}
              />;
            }
            return (
              <Route key={index} path={item.link} element={item.element} />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
