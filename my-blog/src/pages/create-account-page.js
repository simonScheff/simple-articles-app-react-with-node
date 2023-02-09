import { Link, useNavigate } from "react-router-dom";
import useUserForm from "../hooks/use-user-form";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { useState } from "react";

const CreateAccountPage = () => {
    const navigate = useNavigate();
    const userForm = useUserForm();
    const [confirmPass, setConfirmPass] = useState('');
    const createAccount = async() => {
        if (userForm.password.state !== confirmPass) {
            return userForm.error.set('Passwords do not match');
        }
        try {
            await createUserWithEmailAndPassword(getAuth(), userForm.email.state, userForm.password.state);
            userForm.error.set(null);
            navigate('/articles');
        } catch(e) {
            return userForm.error.set(e.message);

        }
    }

    return (<>    
      <h1>Create Account</h1>
      {userForm.form}
      <input
        placeholder="confirm password"
        type="password"
        value={confirmPass}
        onChange={(data) => setConfirmPass(data.target.value)}
      />
      <button disabled={!userForm.email.state || !userForm.password.state} onClick={createAccount}>create</button>
      <p className="create-account-text">
        <Link to="/create-account">Don't have an account? create one here</Link>
      </p>
    </>)
}

export default CreateAccountPage;