
//imports
import React, { useState } from "react";
import axios from "axios";
import "./product.css";
import {Storage} from "../../firebase"
import { useAuth } from "./../../contexts/AuthContext";


function Product() {
  const { currentUser } = useAuth();

  const [productname, setProductname] = useState("");
  const [productdescription, setProductdescription] = useState("");
  const [productfeatures, setProductfeatures] = useState("");
  const [productshortdescription, setProductshortdescription] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [regularprice, setRegularprice] = useState("");
  const [sellprice, setSellprice] = useState("");
  const [sellquantity, setSellquantity] = useState("");
  const [category, setCategory] = useState("food");
  const [phone, setPhone] = useState("")

  //image holder
  const [productdescriptionimage, setProductdescriptionimage] = useState("");
  const [productfeaturesimage, setProductfeaturesimage] = useState("");
  const [productshortdescimage, setProductshortdescimage] = useState("");
  const [productimage, setProductimage] = useState("");
  const [galleryimage, setGalleryimage] = useState("");

  //imageURL
  const [productdescriptionimageURL, setProductdescriptionimageURL]= useState("");
  const [productfeaturesimageURL, setProductfeaturesimageURL] = useState("");
  const [productshortdescimageURL, setProductshortdescimageURL] = useState("");
  const [productimageURL, setProductimageURL] = useState("");
  const [galleryimageURL, setGalleryimageURL] = useState("");


  

  //shows the image in the page and sets the respective state 
  const product__desc_preview = (e) => {
    var image = document.getElementById("uploadPreview01");
    image.src = URL.createObjectURL(e.target.files[0]);
    setProductdescriptionimage(e.target.files[0]);
  };
  const product__features_preview = (e) => {
    var image = document.getElementById("uploadPreview02");
    image.src = URL.createObjectURL(e.target.files[0]);
    setProductfeaturesimage(e.target.files[0]);
  };
  const product__shortdescription_preview = (e) => {
    var image = document.getElementById("uploadPreview03");
    image.src = URL.createObjectURL(e.target.files[0]);
    setProductshortdescimage(e.target.files[0]);
  };
  const product__setproductimage_preview = (e) => {
    var image = document.getElementById("uploadPreview04");
    image.src = URL.createObjectURL(e.target.files[0]);
    setProductimage(e.target.files[0]);
  };
  const product__galleryimages_preview = (e) => {
    var image = document.getElementById("uploadPreview05");
    image.src = URL.createObjectURL(e.target.files[0]);
    setGalleryimage(e.target.files[0]);
  };

  const productdescriptionUpload=()=>{
    const uploadTask = Storage.ref(`user_post_images/${currentUser.email}/${productdescriptionimage.name}`)
      .put(productdescriptionimage);
    uploadTask.on(
      "state_changed",
      snapshot=>{},
      error =>{
        console.log(error)
      },
      ()=>{
        Storage.ref(`user_post_images/${currentUser.email}`)
        .child(productdescriptionimage.name)
        .getDownloadURL()
        .then(url =>{
          setProductdescriptionimageURL(url)
        })
      }
    )
  }

  const productfeaturesUpload=()=>{
    const uploadTask = Storage.ref(`user_post_images/${currentUser.email}/${productfeaturesimage.name}`)
      .put(productfeaturesimage);
    uploadTask.on(
      "state_changed",
      snapshot=>{},
      error =>{
        console.log(error)
      },
      ()=>{
        Storage.ref(`user_post_images/${currentUser.email}`)
        .child(productfeaturesimage.name)
        .getDownloadURL()
        .then(url =>{
          setProductfeaturesimageURL(url)
        })
      }
    )
  }

  const productshortdescriptionUpload=()=>{
    const uploadTask = Storage.ref(`user_post_images/${currentUser.email}/${productshortdescimage.name}`)
      .put(productshortdescimage);
    uploadTask.on(
      "state_changed",
      snapshot=>{},
      error =>{
        console.log(error)
      },
      ()=>{
        Storage.ref(`user_post_images/${currentUser.email}`)
        .child(productshortdescimage.name)
        .getDownloadURL()
        .then(url =>{
          setProductshortdescimageURL(url)
        })
      }
    )
  }

  const productimageUpload=()=>{
    const uploadTask = Storage.ref(`user_post_images/${currentUser.email}/${productimage.name}`)
      .put(productimage);
    uploadTask.on(
      "state_changed",
      snapshot=>{},
      error =>{
        console.log(error)
      },
      ()=>{
        Storage.ref(`user_post_images/${currentUser.email}`)
        .child(productimage.name)
        .getDownloadURL()
        .then(url =>{
          setProductimageURL(url)
        })
      }
    )
  }

  const galleryimageUpload=()=>{
    const uploadTask = Storage.ref(`user_post_images/${currentUser.email}/${galleryimage.name}`)
      .put(galleryimage);
    uploadTask.on(
      "state_changed",
      snapshot=>{},
      error =>{
        console.log(error)
      },
      ()=>{
        Storage.ref(`user_post_images/${currentUser.email}`)
        .child(galleryimage.name)
        .getDownloadURL()
        .then(url =>{
          setGalleryimageURL(url)
        })
      }
    )
  }

  const submitHandler = (e) => {
    e.preventDefault();

    productdescriptionUpload(productdescriptionimage);
    productfeaturesUpload(productfeaturesimage);
    productshortdescriptionUpload(productshortdescimage);
    productimageUpload(productimage);
    galleryimageUpload(galleryimage);

    console.log("works!",productdescriptionimageURL,
    productfeaturesimageURL,
    productshortdescimageURL,
    productimageURL,
    galleryimageURL);

    axios
      .post("http://localhost:5000/send",{productname,
      productdescription,
      productfeatures,
      productshortdescription,
      regularprice,
      sellprice,
      sellquantity,
      brand,
      size,
      color,
      category,
      phone,
      productdescriptionimageURL,
      productfeaturesimageURL,
      productshortdescimageURL,
      productimageURL,
      galleryimageURL,
    })
      .then((res) => {
        console.log(res.data);
      });

      setProductname("");
      setProductdescription("");
      setProductfeatures("");
      setProductshortdescription("");
      setColor("");
      setSize("");
      setBrand("");
      setRegularprice("");
      setSellprice("");
      setSellquantity("");
      setCategory("food");
      setPhone("")
  };

  return (
    <>
      <div className="main__container__product">
        <div className="main_product">
          <div>
          <div className="profile__product__line"></div>    
          <div className="profile__product">
            <span>Email:</span>
            <span>{currentUser.email}</span>
          </div>
          </div>
        <div className="bg__layer__product">
          {/* 728x90 */}
          <div className="product__header__main">
            <div className="product__line"></div>
            <div className="product__sign">
            <span>Product</span>
            </div>
            <div className="product__form">
              <form action="/send" method="post" onSubmit={submitHandler}>
                <div className="product__entry">
                  <span>Product Name</span>
                  <input
                    className="product__desc"
                    type="text"
                    // placeholder="Product name"
                    value={productname}
                    onChange={(e) => setProductname(e.target.value)}
                    required
                  />
                </div>
                <div className="line"></div>
                <div className="product__entry">
                  <span>Product Description</span>
                  <input
                    className="product__desc"
                    type="text"
                    // placeholder="Product Description"
                    value={productdescription}
                    onChange={(e) => setProductdescription(e.target.value)}
                  />
                  <div className="image">
                    <input
                      className="product__descimg"
                      type="file"
                      onChange={product__desc_preview}
                    />
                    <img id="uploadPreview01" alt="" />
                  </div>
                </div>
                <div className="line"></div>
                <div className="product__entry">
                  <span>Product Features</span>
                  <input
                    className="product__desc"
                    type="text"
                    // placeholder="Features "
                    value={productfeatures}
                    onChange={(e) => setProductfeatures(e.target.value)}
                  />
                  <div className="image">
                    <input
                      className="product__descimg"
                      type="file"
                      // placeholder="Product Features"
                      onChange={product__features_preview}
                    />
                    <img id="uploadPreview02" alt="" />
                  </div>
                </div>
                <div className="line"></div>
                <div className="product__entry">
                  <span>Product short description</span>
                  <input
                    className="product__desc"
                    type="text"
                    // placeholder="short description"
                    value={productshortdescription}
                    onChange={(e) => setProductshortdescription(e.target.value)}
                  />
                  <div className="image">
                    <input
                      className="product__descimg"
                      type="file"
                      // placeholder="Product short description"
                      onChange={product__shortdescription_preview}
                    />
                    <img id="uploadPreview03" alt="" />
                  </div>
                </div>
                <div className="line"></div>
                <div className="product__entry">
                  <span>regular price</span>
                  <input
                    className="product__desc"
                    type="number"
                    // placeholder="price"
                    value={regularprice}
                    onChange={(e) => setRegularprice(e.target.value)}
                    required
                  />
                </div>
                <div className="line"></div>
                <div className="product__entry">
                  <span>Sale Price</span>
                  <input
                    className="product__desc"
                    type="number"
                    // placeholder="price"
                    value={sellprice}
                    onChange={(e) => setSellprice(e.target.value)}
                    required
                  />
                </div>
                <div className="line"></div>
                <div className="product__entry">
                  <span>sell quantity</span>
                  <input
                    className="product__desc"
                    type="number"
                    // placeholder="quantity"
                    value={sellquantity}
                    onChange={(e) => setSellquantity(e.target.value)}
                    required
                  />
                </div>
                <div className="line"></div>
                <div className="product__entry">
                  <span>Brand name</span>
                  <input
                    className="product__desc"
                    type="text"
                    // placeholder="brand name"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="line"></div>
                <div className="product__entry">
                  <span>color</span>
                  <input
                    className="product__desc"
                    type="text"
                    // placeholder="please enter all the colors of the product name"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
                <div className="line"></div>
                <div className="product__entry">
                  <span>Size</span>
                  <input
                    className="product__desc"
                    type="text"
                    // placeholder="please enter all the sizes for the product"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>
                <div className="line"></div>
                <div className="product__entry">
                  <span>Phone no.</span>
                  <input
                    className="product__desc"
                    type="number"
                    // placeholder="please enter all the sizes for the product"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="line"></div>
                <div className="product__entry">
                  <span>set product image</span>

                  <div className="image">
                    <input
                      className="product__descimg"
                      type="file"
                      // placeholder="please enter all the sizes for the product"
                      onChange={product__setproductimage_preview}
                    />
                    <img id="uploadPreview04" alt="" />
                  </div>
                </div>
                <div className="line"></div>
                <div className="product__entry">
                  <span>add product gallery images</span>
                  <div className="image">
                    <input
                      className="product__descimg"
                      type="file"
                      // placeholder="please enter all the sizes for the product"
                      onChange={product__galleryimages_preview}
                    />
                    <img id="uploadPreview05" alt="" />
                  </div>
                </div>
                <div className="line"></div>
                <div className="product__entry">
                  <span>Category</span>
                  <select className="category"  value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="food">food</option>
                    <option value="cloths">cloths</option>
                    <option value="electronics">electronics</option>
                    <option value="funiture">funiture</option>
                </select>
                </div>
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

export default Product;
