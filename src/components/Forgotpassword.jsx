import Email from '../assets/email.png';
import Password from '../assets/password.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Forgotpassword=()=>{
const navigate =useNavigate();
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [newpassword,setnew]= useState('');
const [errors,setErrors]= useState({});

const validate =()=>{
const newErrors ={};
if (!email) {
    newErrors.email = '*Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = '*Email is invalid';
  }
    if(!password)
        {
            newErrors.password='*Password is required';
        }
        else if (password.length < 8)
        {
            newErrors.password='*Password must be at least 8 characters';
        }
        if(!newpassword)
            {
                newErrors.newpassword='*Re-enter new password';
            }
            else if(newpassword!==password)
                {
                    newErrors.newpassword='Passwords do not match';
                    newErrors.password='Passwords do not match';
                }
                return newErrors;

};
const handleforgot=()=>{
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      navigate('/login');
    } else {
      setErrors(formErrors);
    }
  }

return (
    <div className="loginbody">
      <div className='logincontainer'>
        <div className="loginheader">
          <div className="text">Reset Password</div>
          <div className="underline"></div>
        </div>
        <div className="logininputs">
        <div className="logininput">
            <img src={Email} alt="Email Icon" />
            <input
              type="email"
              placeholder='Email Id'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
             </div>
        {errors.email && <div className='error'>{errors.email}</div>}

          <div className="logininput">
            <img src={Password} alt="Password Icon" />
            <input
              type="password"
              placeholder='New Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
          {errors.password && <div className="error">{errors.password}
          </div>}

          <div className="logininput">
            <img src={Password} alt="Password Icon" />
            <input
              type="password"
              placeholder='Re-enter Password'
              value={newpassword}
              onChange={(e) => setnew(e.target.value)}
            />
            </div>
          {errors.newpassword && <div className="error">{errors.newpassword}
          </div>}

        </div>

          <div className= "submit" onClick={handleforgot}>Reset Password</div>
          
        </div>
      </div>
   
  );


}
export default Forgotpassword;