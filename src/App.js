import './App.css';
import {useState} from 'react'
import axios from 'axios'

function App() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmedpassword, setConfirmedpassword] = useState(null);
  const [error,setError] = useState(null)

  const hamdleSubmit = (e) => {
    e.preventDefault();
    if(password!==confirmedpassword){
      setError("Passwords donot match");
      return;
    }
    axios.post('http://localhost:8000/signup',{
      username,password
    })
    console.log("username",username);
    console.log("password",password);
    console.log("confirmed password",confirmedpassword);
  }
  return (
    <form onSubmit={hamdleSubmit()}>
      <input type="text" id = "username" name = "username" placeholder="Username" required onChange={(e) => setUsername(e.target.value)}/>
      <input type="text" id = "password" name = "password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
      <input type="text" id = "password-check" name = "password-check" placeholder="Confirm Password" required onChange={(e) => setConfirmedpassword(e.target.value)}/>
      <input type="submit" onClick={""}>Go!</input>
      <p>{error}</p>
    </form>
  );
}

export default App;
