import { useNavigate } from "react-router-dom";
import useUserForm from "../hooks/use-user-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import useUser from "../hooks/use-user";
import axios from "axios";
import { useEffect } from "react";

const CreateAccountPage = () => {
  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
    } catch (e) {
      return alert(e.message);
    }
  };

  const navigate = useNavigate();
  const { getToken, user } = useUser();
  const userForm = useUserForm(true, createAccount);
  const email = userForm.watch("email");
  const userName = userForm.watch("userName");
  const password = userForm.watch("password");

  useEffect(() => {
    const saveUser = async () => {
      try {
        await axios.post(
          "http://localhost:8000/api/user",
          { userName, email },
          { headers: { authtoken: await getToken() } }
        );
        navigate("/articles");
      } catch (e) {
        alert(e.message);
      }
    };
    if (user) {
      saveUser();
    }
  }, [user]);

  return <>{userForm.form}</>;
};

export default CreateAccountPage;
