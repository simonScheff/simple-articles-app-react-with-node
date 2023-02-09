import { useState } from "react";

const errors = new Map();
errors.set('auth/invalid-email', 'Invalid email');
errors.set('auth/wrong-password', 'Wrong user or password');
errors.set('default', 'There was an error');

const useUserForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const form = (<>
          {error && <p className="error">{error}</p>}
          <input
        placeholder="Your Email"
        type="email"
        value={email}
        onChange={(data) => setEmail(data.target.value)}
      />
      <input
        placeholder="Your password"
        type="password"
        value={password}
        onChange={(data) => setPassword(data.target.value)}
      />
    </>)

    return {
        email: {
            set: setEmail,
            state: email
        },
        password: {
            set: setPassword,
            state: password
        },
        error: {
            set: setError,
            state: error,
            list: errors  
        },
        form
    };
    
}

export default useUserForm;