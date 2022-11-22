import UserContext from './contect';
import { ToastContainer, toast } from 'react-toastify';

import React, { useContext, useState } from 'react'




function Home() {
  return (
  <>
  <Pro />
    <div style={{ 
        backgroundImage: `url("https://img.freepik.com/free-photo/traveller-blogger-kit-summer-vacation-top-view-flat-lay-camera-with-accessories-sunglasses-paper-notebook-smartphone-with-headset-two-colored-background-pastel-colors_482257-32969.jpg?w=1060&t=st=1669102940~exp=1669103540~hmac=8e9f0f5b4ec644b60c51d8a2e1151f477891fd2b32aa27dbb853ffc039601b89")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height:"630px"
      }}>
  
  </div>
  <div>
    <h3 className='text-center'>Why Us ?</h3>
<h5>Abdul Hadhi Rental is the number one online equipment renting platform which provides best quality brand new products for rent at low price with 100% customer satisifaction. We are the 1st Equipment rental website providing brand new electronic eqipments at low price. Our moto is to make people life eaiser by providing them their needs at their door steps.</h5>
  </div>
  <div>
    <hr />

<div className=' d-flex justify-content-center'>
<div>

</div>
</div>
  </div>
  </>

  )
}


function Pro() {
  let context = useContext(UserContext);
  const { cart, setCart, data, setTotal, total } = context;
  let [fil,setFil] = useState([...data]);
  let [ query,setQuery] = useState("");

  if (!data) {
    toast.warn("your Token is Expried, Plz Login again")

  }

  const handleSubmit = (item) => {
    let carts = [...cart]
    carts.push(item)
    setCart(carts)
    setTotal(Number(total) + Number(item.price));
  }

let val = ["camera","speaker","light","other"]



const handlesubmit = (v)=>{
let value = data.filter((item)=>item.type === v)

setFil(value)
}
const search = ()=>{
  let value = data.filter((item)=> item.type.toLowerCase().includes(query));
         setFil(value)
}
  return (



    <div>
   <Slider />

    <div className=' d-flex justify-content-center'>
    <div className=" mt-3">
    <div class="d-flex">
        <input class="form-control me-2 shadow-none" type="text" placeholder="Search"  value={query} onChange={(e)=>setQuery(e.target.value)}/>
        <button class="btn btn-outline-success shadow-none" type="button" onClick={search}>Search</button>
      </div>
    <label htmlFor="validationCustom04" className="form-label">Filter products</label>
    <select className="form-select" id="validationCustom04" onChange={(e)=>handlesubmit(e.target.value)}>
              {/* <option selected value="all" onClick={
                ()=> setFil([...data])
              }>All</option> */}
              {
                val.map((item,i)=>{
                  return <option value={item}>{item}</option>
                })
              }
            
           
    </select>
    </div>
    </div>
      <div className='d'>
     
        {
          fil ? fil.map((item, i) => {

            return <div className="card" style={{ width: "18rem", padding: "10px", margin: "10px" }} key={i}>
              <img src={item.productUrl} className="card-img-top" alt={item.productName} style={{ height: "18rem" }} />
              <div className="card-body ">

                <h5 className="card-title">{item.productName}</h5>

                <div className='d-flex justify-content-center align-items-center'>
                  <div>
                    <p className="card-text">{`Price : ${item.price}`}</p>
                    <p className="card-text">{`Quantity : ${item.quantity}`}</p>

                    <button type="button" className="btn btn-success" onClick={() => handleSubmit(item)}>Add to Cart</button>
                  </div>
                </div>
              </div>

            </div>

          }) : null
        }
        <ToastContainer />
      </div>











    </div>
  )
}


function Slider() {
  return (
    <>
    
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" style={{ 
        backgroundImage: `url("https://images.pexels.com/photos/3802602/pexels-photo-3802602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height:"630px"
      }}>
    
    </div>
    <div className="carousel-item">
      <img src="https://3dapartment.com/blog/wp-content/uploads/2021/03/high-rent-boston.jpeg" className="d-block w-100" style={{height:"500px"}} alt="rent2"/>
    </div>
    <div className="carousel-item">
      <img src="https://images.livemint.com/img/2022/04/19/1600x900/Tenancy_1563283191321_1650352689091.jpg" className="d-block w-100" style={{height:"500px"}} alt="rent3 "/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div></>
  )
}
export default Home

