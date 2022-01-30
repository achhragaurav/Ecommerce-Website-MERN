import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/apiCalls";
import "./newProduct.css";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import app from "../../firebase"
import { uploadImageAndGetURL } from "../../firebaseUpload";
export default function NewProduct() {
  const dispatch = useDispatch()
  const [input, setInput] = useState(null);
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  const spaceRemoverLowerCase = (array) =>{
    const newArray = array.map((item) => (item.replace(/ /g, "").toLowerCase()));
    return newArray
  }

  const handleSize = e =>{
    const sizes = e.target.value.split(",");
    setSize(spaceRemoverLowerCase(sizes))
    console.log(size);
  };
  const handleColor = e =>{
    const colors = e.target.value.split(",");
    setColor(spaceRemoverLowerCase(colors))
    console.log(color);

  };
  const handleCat = e =>{
    const cats = e.target.value.split(",");
    setCat(spaceRemoverLowerCase(cats))
    console.log(cat);

  };
  const handleChange = e =>{
    setInput(prev=>{
      return {...prev, [e.target.name]: e.target.value}
    })
  };

  
  const handleCreate = async (e) =>{
    e.preventDefault();
    if(file && file.name){
      console.log(file);
    const executeAfterURL = (downloadURL) => {
      const product = {...input, img:downloadURL, categories: cat, size,color};
      console.log(product);
      addProduct(product, dispatch);
    }
    uploadImageAndGetURL(file, executeAfterURL)
  }
   else{
    const product = {...input, img:file, categories: cat, size,color};
    addProduct(product, dispatch);
   }
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Product Name" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="Product Description"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="Product Price" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts"  onChange={handleCat}/>
        </div>
        <div className="addProductItem">
          <label>Sizes</label>
          <input type="text" placeholder="xs,s,m,l,xl,xxl"  onChange={handleSize}/>
        </div>
        <div className="addProductItem">
          <label>Colors</label>
          <input type="text" placeholder="white,blue,green,red"  onChange={handleColor}/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleCreate}>Create</button>
      </form>
    </div>
  );
}
