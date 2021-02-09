import React, { useEffect, useState } from "react";
import Navbar from "./../Navbar/Navbar";
import "./Profile.css";
import { useAuth } from "./../../contexts/AuthContext";
import {Storage, Firestore} from "../../firebase"

function Profile() {
  const [pan, setPan] = useState("");
  const [panImage, setPanImage] = useState("");
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const [imgURL, setImgURL] = useState('')
  // const [info, setInfo] = useState("")
  // const [profileImage, setProfileImage] = useState("")
  // const [profileImageURL, setProfileImageURL] = useState("")

  const types = ["image/png", "image/jpeg"];


  // useEffect(()=>{
  //   messageGet();
  // })

  const submitHandle = async(e) => {
    e.preventDefault();
    
    await handleUpload(panImage,currentUser.email);
    
    await messageUpload(fullname,
    currentUser.email,
    phonenumber,
    displayname,
    address,
    pan,
    imgURL
    )
    setAddress("");
    setDisplayname("");
    setFullname("");
    setPan("");
    setPanImage("");
    setPhonenumber("");
      
  };

  const handleUpload=()=>{
    const uploadTask = Storage.ref(`userinfo/${panImage.name}`).put(panImage);
    uploadTask.on(
      "state_changed",
      snapshot=>{},
      error =>{
        console.log(error)
      },
      ()=>{
        Storage.ref("userinfo")
        .child(panImage.name)
        .getDownloadURL()
        .then(url =>{
          setImgURL(url)
        })
      }
    )
  }

  // const messageGet = async() =>{
  //   const docRef = Firestore.collection('users').doc(`${currentUser.email}`);
  //   const info = await docRef.get();
  //   setInfo(info.data());
  // }

  const messageUpload= async ()=>{
    const docRef = Firestore.collection('users').doc(`${currentUser.email}`);

    await docRef.set({
      fullname:fullname,
      phonenumber:phonenumber,
      displayname:displayname,
      address:address,
      pan:pan ,
      imgURL:imgURL
    });
  }


  const pan_preview = (e) => {
    var image = document.getElementById("panImage");
    image.src = URL.createObjectURL(e.target.files[0]);

    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setPanImage(selected);
      setError("");
    } else {
      setPanImage("");
      setError("Please select an image file (png or jpg)");
    }
  };

  return (
    <>
      <Navbar />

      <div className="main__container__profile">
        <div className="main_product">
        <div className="bg__layer__profile">
          {/* 728x90 */}
          <div className="profile__header__main">
            <div className="profile__line"></div>
            <div className="profile__sign">
            <span>Profile</span>
            </div>
            <div className="profile__form">
              <form action="/send" method="post" onSubmit={submitHandle}>
                <div className="profile__entry">
                  <span>PAN / VAT no.</span>
                  <input
                    className="profile__desc"
                    type="number"
                    // placeholder="Product Description"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                  />
                  <div className="profile__image">
                    <input
                      className="profile__descimg"
                      type="file"
                      onChange={pan_preview}
                    />
                    <img id="panImage" alt="" />
                  </div>
                </div>
                <div className="line"></div>
                <div className="profile__entry">
                  <span>first and last name</span>
                  <input
                    className="profile__desc"
                    type="text"
                    // placeholder="Features "
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                <div className="line"></div>
                <div className="profile__entry">
                  <span>Phone no.</span>
                  <input
                    className="profile__desc"
                    type="number"
                    // placeholder="short description"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                  />
                </div>
                <div className="line"></div>
                <div className="profile__entry">
                  <span>Display name/ subname</span>
                  <input
                    className="profile__desc"
                    type="text"
                    // placeholder="price"
                    value={displayname}
                    onChange={(e) => setDisplayname(e.target.value)}
                    required
                  />
                </div>
                <div className="line"></div>
                <div className="profile__entry">
                  <span>Address</span>
                  <input
                    className="profile__desc"
                    type="text"
                    // placeholder="price"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="line"></div>
                <div className="bottom__product">
                  <button className="btn__product">Upload</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>

    </>
  );
}

export default Profile;
