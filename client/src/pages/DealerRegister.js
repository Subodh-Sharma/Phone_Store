import React, { useState, useEffect } from "react";
import {MDBCard,MDBCardBody,MDBInput,MDBCardFooter,MDBValidation,MDBBtn,MDBIcon,MDBSpinner} from "mdb-react-ui-kit";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";
import { dealerregister } from "../redux/features/dealerSlice";

const initialState = {
    name:"",
    email:"",
    contact:"",
    password:"",
    cpassword:"",
    type:"dealer"
}

const DealerRegister = () => {
    const [formData,setFormData] = useState(initialState);
    const {loading,error} = useSelector((state)=>({...state.dealer}));
    const {name,email,contact,password,cpassword,type} = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const onInputChange = (e)=>{
        let {name,value} = e.target;
        setFormData({...formData,[name]:value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(password!==cpassword){
            return toast.error("Password should match")
        }
        if(name && email && contact && password && cpassword){
            dispatch(dealerregister({formData,navigate,toast}))
        }
        
    }
    useEffect(()=>{
        error && toast.error(error);
    },[error]);

    return (
        <div>
            <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "80px" }}>
                <MDBCard alignment="center">
                    <MDBIcon fas icon="user-circle" className="fa-2x" />
                    <h5>Sign Up As Dealer</h5>
                    <MDBCardBody>
                        <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                            <div className="col-md-12">
                                <MDBInput
                                    label="Dealer Name"
                                    type="text"
                                    value={name}
                                    name="name"
                                    onChange={onInputChange}
                                    required
                                    invalid
                                    validation="Please provide your Name"
                                />
                            </div>
                            <div className="col-md-12">
                                <MDBInput
                                    label="Dealer Email"
                                    type="email"
                                    value={email}
                                    name="email"
                                    onChange={onInputChange}
                                    required
                                    invalid
                                    validation="Please provide your email"
                                />
                            </div>
                            <div className="col-md-12">
                                <MDBInput
                                    label="Contact"
                                    type="Number"
                                    value={contact}
                                    name="contact"
                                    onChange={onInputChange}
                                    required
                                    invalid
                                    validation="Please provide your Contact Number"
                                />
                            </div>
                            <div className="col-md-12">
                                <MDBInput
                                    label="Password"
                                    type="password"
                                    value={password}
                                    name="password"
                                    onChange={onInputChange}
                                    required
                                    invalid
                                    validation="Please Enter your password"
                                />
                            </div>
                            <div className="col-md-12">
                                <MDBInput
                                    label="Confirm Password"
                                    type="password"
                                    value={cpassword}
                                    name="cpassword"
                                    onChange={onInputChange}
                                    required
                                    invalid
                                    validation="Please Enter your Confirm Password"
                                />
                            </div>
                            <div className="col-12">
                                <MDBBtn style={{ width: "100%" }} className="mt-2">
                                    {loading && (
                                        <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                                    )}
                                    Register
                                </MDBBtn>
                            </div>
                        </MDBValidation>
                    </MDBCardBody>
                    <MDBCardFooter>
                        <Link to="/dealersignin"><p>Already have an account? Sign In</p></Link>
                    </MDBCardFooter>
                </MDBCard>
            </div>
        </div>
    )
}
export default DealerRegister;