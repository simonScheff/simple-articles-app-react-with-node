import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useUserForm from "../hooks/use-user-form";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = async (data) => {
    try {
      await signInWithEmailAndPassword(getAuth(), data.email, data.password);
      navigate("/articles");
    } catch (error) {
      const errorText = userForm.error.list.get(error.code)
        ? userForm.error.list.get(error.code)
        : userForm.error.list.get("default");
      userForm.error.set(errorText);
    }
  };
  const userForm = useUserForm(false, login);

  return <>{userForm.form}</>;
};

export default LoginPage;
