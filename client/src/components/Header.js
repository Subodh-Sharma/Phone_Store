import React, { useState } from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBBtn, MDBCollapse } from 'mdb-react-ui-kit';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setCartEmpty, setUserLogout } from '../redux/features/userSlice';
import { setDealerLogout } from '../redux/features/dealerSlice';
import { search,getphones, setDealerPhonesEmpty } from '../redux/features/phoneSlice';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showBasic, setShowBasic] = useState(false);
  const [searchQuery,setSearchQuery] = useState("");
  const { dealer } = useSelector((state) => ({ ...state.dealer }))
  const { user } = useSelector((state) => ({ ...state.user }))
  var ID = dealer?.result?._id || user?.result?._id;
  const handleLogout = ()=>{
    if(dealer){
      dispatch(setDealerLogout());
      dispatch(setDealerPhonesEmpty());
    }
    if(user){
      dispatch(setUserLogout());
      dispatch(setCartEmpty())
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(searchQuery){
      dispatch(search(searchQuery));
      navigate(`phone/search?q=${searchQuery}`)
      setSearchQuery("")
    }else{
      navigate("/")
    }
  }
  const handleHome = ()=>{
    dispatch(getphones())
  }
  return (
    <MDBNavbar expand='lg' light bgColor='primary' style={{ color: "red" }}>
      <MDBContainer fluid>
        <MDBNavbarBrand style={{ color: "white" }}>PHONE STORE</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem style={{ marginRight: "10px",marginTop:"8px" }} >
              <Link active="true" aria-current='page' to='/' style={{ color: "white" }} onClick={handleHome}>
                Home
              </Link>
            </MDBNavbarItem>
            {dealer?.result?._id && (
              <>
                <MDBNavbarItem style={{ marginRight: "10px",marginTop:"8px" }}>
                  <Link to='/addphone' style={{ color: "white" }}>AddPhone</Link>
                </MDBNavbarItem>
                <MDBNavbarItem style={{ marginRight: "10px",marginTop:"8px" }}>
                  <Link to='/dashboard' style={{ color: "white" }}>Dashboard</Link>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id && (
              <>
                <MDBNavbarItem style={{ marginRight: "10px",marginTop:"8px" }}>
                  <Link to={`/cart/${user?.result?._id}`} style={{ color: "white" }}>Cart</Link>
                </MDBNavbarItem>
              </>
            )}
            {ID ? (
              <MDBNavbarItem style={{ marginRight: "10px",marginTop:"8px" }}>
                <Link to="/" style={{ color: "white" }} onClick={handleLogout}>Logout</Link>
              </MDBNavbarItem>
            ) : (
              <>
                <MDBNavbarItem style={{ marginRight: "10px" ,marginTop:"8px" }}>
                  <Link to="/selectsignin" style={{ color: "white" }}>SignIn</Link>
                </MDBNavbarItem>
                <MDBNavbarItem style={{ marginRight: "10px",marginTop:"8px" }}>
                  <Link to='/selectsignup' style={{ color: "white" }}>SignUp</Link>
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
          <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
            <input type='text' className='form-control' placeholder='search phone' value={searchQuery} onChange={(e)=>{
              setSearchQuery(e.target.value)
            }}/>
            <MDBBtn color='dark' type="submit">Search</MDBBtn>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}