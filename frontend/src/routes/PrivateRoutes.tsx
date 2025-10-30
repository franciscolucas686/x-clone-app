import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import Feed from "../components/feed/Feed";
import Profile from "../pages/ProfilePage";
import MessagePage from "../pages/MessagePage";
import NotificationsPage from "../pages/NotificationsPage";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<MessagePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}