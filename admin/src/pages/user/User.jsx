import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./user.css";
import { useSelector } from "react-redux";
import { getUsers, updateUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { deleteImages, uploadImageAndGetURL } from "../../firebaseUpload";

export default function User() {
  const users = useSelector(state=>state.allusers.allusersData);
  const dispatch = useDispatch();
  const {userId} = useParams();
  const user = users.find((u) => u._id === userId)
  // States
  const [username, setUsername] = useState("")
  const [gender, setGender] = useState("")
  const [fullName, setFullName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPhone, setNewPhone] = useState([])
  const [newAddress, setNewAddress] = useState([])
  const [newImage, setNewImage] = useState("");
  const [newShowImage, setNewShowImage] = useState("");
  const [previousImageURL, setPreviousImageURL] = useState("");


  console.log(user);
    const setData = (data)=>{
    setUsername(data.username)
    setGender(data.gender)
    setFullName(data.fullName)
    setNewEmail(data.email)
    setNewPhone(data.phone[0])
    setNewAddress(data.address[0])
    setNewImage(data.img)
    setNewShowImage(data.img)
    setPreviousImageURL(data.img);
    }

  const updaterFunction = async (e) =>{
    e.preventDefault();
    if(typeof newImage === "object"){
        const newImageUploaded = await uploadImageAndGetURL(newImage,(downloadURL) =>{
            const updatedUser = {
            username:username,
            email:newEmail,
            img: downloadURL,
            address: newAddress,
            phone: newPhone,
            gender: gender,
            fullName: fullName }
           const res = updateUser(userId,updatedUser,dispatch);
           if(downloadURL !== previousImageURL){
            deleteImages(previousImageURL.split("/o/")[1].split("?alt")[0])
           }
        })
    }
    else{
      const updatedUser = {
        username:username,
        email:newEmail,
        img: newImage,
        address: [newAddress],
        phone: [newPhone],
        gender: gender,
        fullName: fullName }
        const res = updateUser(userId,updatedUser,dispatch).then(() =>{
            console.log("userupdated");
        })
    }
  }  
  useEffect(() =>{
    getUsers(dispatch)
    .then((data) =>{
      console.log(data);
      setData(data.find((user) => user._id === userId))
  })
  },[])
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.img}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.fullName}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user.createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone[0]}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address[0]}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  value={username}
                  onChange={(e) =>{
                    setUsername(e.target.value)
                }}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={user.fullName}
                  onChange={(e) =>{
                    setFullName(e.target.value)
                }}
                  value={fullName}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  value={newEmail}
                  onChange={(e) =>{
                    setNewEmail(e.target.value)
                }}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={user.phone[0]}
                  value={newPhone}
                  onChange={(e) =>{
                    setNewPhone(e.target.value)
                }}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={user.address[0]}
                  value={newAddress}
                  onChange={(e) =>{
                    setNewAddress(e.target.value)
                }}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Gender</label>
                <input
                  type="text"
                  placeholder={user.gender}
                  value={gender}
                  onChange={(e) =>{
                    setGender(e.target.value)
                }}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={newShowImage}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={(e) =>{
                  const imageConverted = URL.createObjectURL(e.target.files[0])
                  setPreviousImageURL(user.img);
                  setNewImage(e.target.files[0]);
                  setNewShowImage(imageConverted);
                }}/>
              </div>
              <button className="userUpdateButton" onClick={updaterFunction}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
