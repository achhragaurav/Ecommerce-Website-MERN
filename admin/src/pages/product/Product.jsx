import { Link, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import {userRequest} from "../../requestMethods"
import { getProducts, getSingleProduct, updateProduct } from "../../redux/apiCalls";
import { deleteImages, uploadImageAndGetURL } from "../../firebaseUpload";

export default function Product() {
    const {productId} = useParams();
    const products= useSelector(state=>state.products.products);
    const [product,setProduct] = useState({})
    const [pStats, setPstats] = useState([])
    const dispatch  = useDispatch()
    const [newTitle, setNewTitle] = useState("")
    const [newDesc, setNewDesc] = useState("")
    const [newCat, setNewCat] = useState([])
    const [newSize, setNewSize] = useState([])
    const [newColor, setNewColor] = useState([])
    const [newPrice, setNewPrice] = useState(null)
    const [newInStock, setNewInStock] = useState(true)
    const [newImage, setNewImage] = useState("")
    const [showImage, setShowImage] = useState("");
    const [previousImageURL, setPreviousImageURL] = useState(null);
    const spaceRemoverLowerCase = (string) =>{
        const array = string.split(",");
        const newArray = array.map((item) => (item.replace(/ /g, "").toLowerCase()));
        console.log(newArray);
        return newArray
      }

        const setData = (data)=>{
            setProduct(data)
        setNewTitle(data.title)
        setNewDesc(data.desc)
        setNewCat(data.categories)
        setNewSize(data.size)
        setNewColor(data.color)
        setNewPrice(data.price)
        setNewInStock(data.inStock)
        setNewImage(data.img);
        setShowImage(data.img);
        }

        useEffect(() =>{
                getProducts(dispatch).then((data) =>{
                    console.log(data);
                    setData(data.find((product) => product._id === productId))
                })
        },[])
    const MONTHS = 
        [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ]
    const updaterFunction = async (e) => {
        e.preventDefault();
        if(typeof newImage === "object"){
            const newImageUploaded = await uploadImageAndGetURL(newImage,(downloadURL) =>{
                const updatedProduct = {title:newTitle,desc:newDesc,img:downloadURL,categories:newCat,size:newSize,color:newColor,price:newPrice,inStock:newInStock, }
               const res = updateProduct(productId,updatedProduct,dispatch);
               if(downloadURL !== previousImageURL){
                deleteImages(previousImageURL.split("/o/")[1].split("?alt")[0])
               }
            })
        }
        else{
            const updatedProduct = {title:newTitle,desc:newDesc,img:newImage,categories:newCat,size:newSize,color:newColor,price:newPrice,inStock:newInStock, }
            const res = updateProduct(productId,updatedProduct,dispatch).then(() =>{

                console.log("productupdated");
            })
        }
    }

        useEffect(() =>{
            const getStats = async () =>{
                try {
                    const res = await userRequest.get("orders/income?pid=" + productId);
                    const list = res.data.sort((a, b) => a._id -b._id)
                    list.map((item) => setPstats((prev) => [...prev, {name: MONTHS[item._id -1], Sales: item.total}]) )
                } catch (error) {
                    console.log(error);
                }
            }
            getStats()
        },[productId, MONTHS])

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
               
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" placeholder={product.title} value={newTitle} onChange={(e) =>{
                      setNewTitle(e.target.value)
                  }}/>
                  <label>Description</label>
                  <input type="text" placeholder={product.desc} value={newDesc} onChange={(e) =>{
                      setNewDesc(e.target.value)
                  }}/>
                  <label>Price</label>
                  <input type="text" placeholder={product.price} value={newPrice} onChange={(e) =>{
                      setNewPrice(e.target.value)
                  }}/>
                  <label>Colors</label>
                  <input type="text" placeholder={product.color} value={newColor} onChange={(e) =>{
                      setNewColor(spaceRemoverLowerCase(e.target.value))
                  }}/>
                  <label>Sizes</label>
                  <input type="text" placeholder={product.size} value={newSize} onChange={(e) =>{
                      setNewSize(spaceRemoverLowerCase(e.target.value))
                  }}/>
                  <label>Categories</label>
                  <input type="text" placeholder={product.categories} value={newCat} onChange={(e) =>{
                      setNewCat(spaceRemoverLowerCase(e.target.value))
                  }}/>
                  <label>In Stock</label>
                  <select name="inStock" id="idStock" onChange={(e) =>{
                      setNewInStock(e.target.value)
                  }}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={showImage} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} onChange={(e) =>{
                          setPreviousImageURL(product.img);
                    if(typeof e.target.files[0] === "object"){
                     const imageConverted = URL.createObjectURL(e.target.files[0])
                     setNewImage(e.target.files[0])
                     setShowImage(imageConverted)
                          }
                  }}/>
                  </div>
                  <button className="productButton" onClick={updaterFunction}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
