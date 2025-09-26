import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Feed from "./components/layout/ThreeColumnLayout";
import Home from "./pages/Home";
// import { useAuth } from './auth/useAuth';

// function PrivateRoute({ children }: { children: JSX.Element }) {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" replace/>;
// }

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
