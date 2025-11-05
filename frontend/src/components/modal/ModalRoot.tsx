import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { closeModal } from "../../features/modal/modalSlice";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import  EditProfileModal  from "./EditProfileModal";

export function ModalRoot() {
  const dispatch = useDispatch();
  const current = useSelector((state: RootState) => state.modal.current);

  if (current === "login")
    return <LoginModal onClose={() => dispatch(closeModal())} />;
  if (current === "register")
    return <RegisterModal onClose={() => dispatch(closeModal())} />;
  if (current === "editProfile")
    return <EditProfileModal />;
  return null;
}
