import React, {useState} from "react";
import style from "./SignInModal.module.scss"
import { auth } from "../../../utils/firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import Password from "@/components/Password/Password";

// sign in with email
const SignInWithEmail = () => {
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
    setEmail(e.target.value)
    setError("");
    // boxshadow will be default
    e.target.style.boxShadow = 'none';
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password should be more than 6 characters");
      return;
    }
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error: any) {  // Manually assert the type of error
      const errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (errorCode === 'auth/user-not-found') {
        setError('User does not exist');
      } else if (errorCode === 'auth/too-many-requests') {
        setError('Too many unsuccessful sign-in attempts. Please try again later.');
      } else if (errorCode === 'auth/invalid-credential') {
        setError('Please check your email and password and try again.');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className={style.signinEmailContainer}>
      <form onSubmit={handleSignIn}>
        <div className={style.signInEmail}>
          <input
            placeholder=" "
            type="email"
            id="email"
            value={email}
            required
            onChange={handleChange}
            style={{ boxShadow: error ? 'rgb(227, 63, 92) 0px 1px 2px, rgb(227, 63, 92) 0px 0px 0px 2px' : 'black' }}
          />
          <label className={`${inputValue.length > 0 ? style.labelFilled : ''}`} style={{color: error ? 'rgb(227, 63, 92)' : 'black'}}>Email</label>
        </div>
        {/* Assuming Password component is defined and takes setPassword and password props */}
        <Password setPassword={setPassword} password={password} error={error} setError={setError}/>
        <button className={style.signInEmailBtn}type="submit">
          Continue
        </button>
      </form>
      {error && <p className={style.alertMessage}>{error}</p>}
    </div>
  );
};

export default SignInWithEmail;