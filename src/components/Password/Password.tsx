import React, { useState, useRef } from "react"
import style from "./Password.module.scss"
// Import React icons
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";

interface Props {
  setPassword: React.Dispatch<React.SetStateAction<string>>
  password: string
  error:any
  setError: React.Dispatch<React.SetStateAction<string>>
}


// Input Password Component
const Password: React.FC<Props> = ({setPassword ,password, error, setError}) => {
  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  // to handle password container focus
  const passwordRef: React.RefObject<HTMLInputElement | null> = useRef(null);

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
    setPassword(e.target.value)
    setError('')
    // boxshadow  will be default
    e.target.style.boxShadow = 'none';
  };
  // Password toggle handler
  const togglePassword = () => {
    // Only show password toggle when there is input in the password field
    if (passwordRef.current && passwordRef.current.value.length > 0) {
      setPasswordShown(!passwordShown);
    }
  };

  return (
    <div className={style.passwordContainer}>
      <input 
        className={style.passwordInput} 
        type={passwordShown ? "text" : "password"} 
        required 
        placeholder=" "  
        id="password" value={password} 
        ref={(passwordRef as React.RefObject<HTMLInputElement>)} 
        onChange={handleChange}
        style={{ boxShadow: error ? 'rgb(227, 63, 92) 0px 1px 2px, rgb(227, 63, 92) 0px 0px 0px 2px' : 'black' }}
      />
      {passwordRef.current && passwordRef.current.value.length > 0 &&
        <button className={style.passwordHide} type="button" onClick={togglePassword}>{passwordShown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
      }
      <label className={`${inputValue.length > 0 ? style.labelFilled : ''}`} style={{color: error ? 'rgb(227, 63, 92)' : 'black'}}>Password</label>
    </div>
  );
}

export default Password