import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Home from "./pages/Home";
import Feed from "./components/feed/Feed";
import Profile from "./pages/ProfilePage";
import AppLayout from "./layouts/AppLayout";
import MessagePage from "./pages/MessagePage";
import NotificationsPage from "./pages/NotificationsPage";


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
          <Route element={<AppLayout />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<MessagePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
