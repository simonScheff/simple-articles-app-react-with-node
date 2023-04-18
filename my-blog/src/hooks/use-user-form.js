import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const errors = new Map();
errors.set("auth/invalid-email", "Invalid email");
errors.set("auth/wrong-password", "Wrong user or password");
errors.set("default", "There was an error");

const useUserForm = (create = false, onSubmit) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, touchedFields, isValid },
  } = useForm({ mode: "onChange" });

  const form = (
    <>
      {create ? <h1>Create Account</h1> : <h1>Login</h1>}
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        {create && (
          <input
            placeholder="user Name"
            type="text"
            {...register("userName", { required: true })}
          />
        )}
        {touchedFields.userName && errors.userName && (
          <p className="error">Invalid user name</p>
        )}
        <input
          placeholder="Your Email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {touchedFields.email && errors.email && (
          <p className="error">Invalid email</p>
        )}
        <input
          placeholder="Your password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {touchedFields.password && errors.password && (
          <p className="error">Invalid password - minLength: 6 </p>
        )}
        {create && (
          <>
            <input
              placeholder="confirm password"
              type="password"
              {...register("confirmPass", { required: true, minLength: 6 })}
            />
            {touchedFields.confirmPass && watch('confirmPass') !== watch('password') &&  (
              <>
                <p className="error">Passwords don't match</p>
                <br />
              </>
            )}
          </>
        )}
        <button type="submit" disabled={!isDirty || !isValid}>
          {create ? "create" : "sign in"}
        </button>
        {!create && (
          <p className="create-account-text">
            <Link to="/create-account">
              Don't have an account? create one here
            </Link>
          </p>
        )}
      </form>
    </>
  );

   return { form, watch };

};

export default useUserForm;
