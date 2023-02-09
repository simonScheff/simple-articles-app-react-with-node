import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth"
import useUserForm from "../hooks/use-user-form";

const LoginPage = () => {
  const navigate = useNavigate();
  const userForm = useUserForm();

  const login = async() => {
    try {
      await signInWithEmailAndPassword(getAuth(), userForm.email.state, userForm.password.state);
      navigate('/articles');
    } catch(error) {
      const errorText = userForm.error.list.get(error.code) ? userForm.error.list.get(error.code) : userForm.error.list.get('default');
      userForm.error.set(errorText);
    }
  };

  return (
    <>
      <h1>Login</h1>
      {userForm.form}
      <button disabled={!userForm.email.state || !userForm.password.state} onClick={login}>Login</button>
      <p className="create-account-text">
        <Link to="/create-account">Don't have an account? create one here</Link>
      </p>
    </>
  );
};

export default LoginPage;
