import "./newUser.css";
import {useDispatch} from "react-redux";
import { useState } from "react";
import { uploadImageAndGetURL } from "../../firebaseUpload";
import { addUser } from "../../redux/apiCalls";

export default function NewUser() {
  const [username, setUsername] = useState("")
  const [gender, setGender] = useState("")
  const [fullName, setFullName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPhone, setNewPhone] = useState([])
  const [newAddress, setNewAddress] = useState([])
  const [newImage, setNewImage] = useState("");
  const [newShowImage, setNewShowImage] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const addUserHandler = () =>{
    console.log("I am happening");
if(typeof newImage === "object"){
  const executeAfterURL = (downloadURL) => {
    const newUser = {
      username:username,
      password:password,
      email:newEmail,
      img: downloadURL,
      address: newAddress,
      phone: newPhone,
      gender: gender,
      fullName: fullName }
      addUser(newUser, dispatch);
  }
  uploadImageAndGetURL(newImage, executeAfterURL)
}
else{
  const newUser = {
    username:username,
    password:password,
    email:newEmail,
    img: newImage,
    address: newAddress,
    phone: newPhone,
    gender: gender,
    fullName: fullName }
  addUser(newUser, dispatch)
}

  }


  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <img src={newShowImage} style={{width: "70px",height:"70px",borderRadius:"50%"}} alt="img" />
      <form className="newUserForm" onSubmit={(e) =>{
        e.preventDefault();
        addUserHandler();
      }}>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" value={username} onChange={(e) =>{
            setUsername(e.target.value)
          }}/>
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" value={fullName} onChange={(e) =>{
            setFullName(e.target.value)
          }}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com"  value={newEmail} onChange={(e) =>{
            setNewEmail(e.target.value)
          }}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" value={password} onChange={(e) =>{
            setPassword(e.target.value)
          }}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" value={newPhone} onChange={(e) =>{
            setNewPhone(e.target.value)
          }}/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" value={newAddress} onChange={(e) =>{
            setNewAddress(e.target.value)
          }}/>
        </div>
        <div className="newUserItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e) =>{
                    if(typeof e.target.files[0] === "object"){
                     const imageConverted = URL.createObjectURL(e.target.files[0]);
                     setNewImage(e.target.files[0])
                     setNewShowImage(imageConverted)
                          }
                  }}/>
        </div>
     
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div>
        <button className="newUserButton" type="submit" >Create</button>
      </form>
    </div>
  );
}
