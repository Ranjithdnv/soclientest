import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
function App() {
  const [username, setUsername] = useState("");
  const [usernamess, setUsernamess] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setSocket(io("https://bigserver.onrender.com:5000"));
  }, []);


  useEffect(() => {
    console.log(user!==null)
    if(user!==null){socket?.emit("newUser", user);}
    // socket?.emit("newUser", user);
  }, [user]);


  const func=()=>{
  socket.emit("sendText", {
  senderName: user,
  receiverName: usernamess,text:"hhhhhh"
  
})
}




  useEffect(() => {
    socket?.on("getText", (data) => {
      setNotifications((prev) => [...prev, data]);
      console.log("worked")
    });
  }, [socket]);
  return (
    <div className="container">
    
        <div className="login">
          <h2>Lama App</h2>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsernamess(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
          <div>kk</div>
          <button onClick={func}>button</button>
          <div>   {notifications?.map((n) => <div>{n.text}</div>)}</div>
        </div>
     
    // </div>
  );
}

export default App;
