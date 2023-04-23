import { useNavigate } from "react-router-dom";
import useUserForm from "../hooks/use-user-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = ({ getToken, user, updateUserData }) => {
  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      updateUserData({ userName, email });
      navigate("/articles");
    } catch (e) {
      return alert(e.message);
    }
  };

  const navigate = useNavigate();
  const userForm = useUserForm(true, createAccount);
  const email = userForm.watch("email");
  const userName = userForm.watch("userName");
  const password = userForm.watch("password");

  return <>{userForm.form}</>;
};

export default CreateAccountPage;
