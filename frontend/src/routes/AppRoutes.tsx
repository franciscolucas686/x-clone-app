import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "../components/feed/Feed";
import { ModalRoot } from "../components/modal/ModalRoot";
import { restoreUser } from "../features/auth/authThunks";
import { useAppDispatch } from "../hooks/useAppSelector";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import MessagePage from "../pages/MessagePage";
import NotificationsPage from "../pages/NotificationsPage";
import Profile from "../pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ExplorerPage from "../pages/ExplorerPage";

export function AppRoutes() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ModalRoot />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<MessagePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/explorer" element={<ExplorerPage />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
