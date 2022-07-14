import React, { useState, useEffect } from "react";
import {MDBCard,MDBCardBody,MDBInput,MDBValidation,MDBBtn,MDBIcon,MDBSpinner} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";
import FileBase from "react-file-base64";
import { addPhone } from "../redux/features/phoneSlice";

const initialState = {
    name:"",
    company:"",
    RAM:"",
    storage:"",
    camera:"",
    price:"",
    stock:""
}

const AddPhone = () => {
    const [phoneData,setPhoneData] = useState(initialState);
    const {error,loading} = useSelector((state)=>({...state.phone}));
    const {dealer} = useSelector((state)=>({...state.dealer}));
    const {name,company,RAM,storage,camera,price,stock} = phoneData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const onInputChange = (e)=>{
        let {name,value} = e.target;
        setPhoneData({...phoneData,[name]:value})
    }
    // setPhoneData({...phoneData,addedBy : adminId})
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(name && company && RAM && storage && camera && price && stock){
            const updatedPhoneData = {...phoneData,dealer:dealer?.result?.name}
            dispatch(addPhone({updatedPhoneData,navigate,toast}))
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
                    <h5>ADD NEW PHONE</h5>
                    <MDBCardBody>
                        <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                            <div className="col-md-12">
                                <MDBInput
                                    label="Phone Name"
                                    type="text"
                                    value={name}
                                    name="name"
                                    onChange={onInputChange}
                                    required
                                    autoComplete="off"
                                    invalid="true"
                                    validation="Please provide Phone Name"
                                />
                            </div>
                            <div className="col-md-12">
                                <MDBInput
                                    label="Company Name"
                                    type="text"
                                    value={company}
                                    name="company"
                                    onChange={onInputChange}
                                    required
                                    autoComplete="off"
                                    invalid="true"
                                    validation="Please provide Company Name"
                                />
                            </div>
                            <div className="col-md-12">
                                <MDBInput
                                    label="RAM"
                                    type="number"
                                    value={RAM}
                                    name="RAM"
                                    onChange={onInputChange}
                                    required
                                    autoComplete="off"
                                    invalid="true"
                                    validation="Please provide RAM detail"
                                />
                            </div>
                            <div className="col-md-12">
                                <MDBInput
                                    label="Storage"
                                    type="Number"
                                    value={storage}
                                    name="storage"
                                    onChange={onInputChange}
                                    required
                                    autoComplete="off"
                                    invalid="true"
                                    validation="Please provide Storage detail"
                                />
                            </div>
                            <div className="col-md-12">
                                <MDBInput
                                    label="Camera"
                                    type="number"
                                    value={camera}
                                    name="camera"
                                    onChange={onInputChange}
                                    required
                                    autoComplete="off"
                                    invalid="true"
                                    validation="Please Enter Camera details"
                                />
                            </div>
                            <div className="d-flex justify-content-start">
                                <FileBase
                                type="file"
                                multiple={false}
                                onDone={({base64})=>
                                setPhoneData({...phoneData,imageFile: base64})
                            }
                                />
                            </div>
                            <div className="col-md-12">
                                <MDBInput
                                    label="Price"
                                    type="number"
                                    value={price}
                                    name="price"
                                    onChange={onInputChange}
                                    required
                                    autoComplete="off"
                                    invalid="true"
                                    validation="Please Enter Price"
                                />
                            </div>
                            <div className="col-md-12">
                                <MDBInput
                                    label="Stock"
                                    type="number"
                                    value={stock}
                                    name="stock"
                                    onChange={onInputChange}
                                    required
                                    autoComplete="off"
                                    invalid="true"
                                    validation="Please provide Stock"
                                />
                            </div>
                            <div className="col-12">
                                <MDBBtn style={{ width: "100%" }} className="mt-2">
                                    {loading && (
                                        <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                                    )}
                                    ADD
                                </MDBBtn>
                            </div>
                        </MDBValidation>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </div>
    )
}
export default AddPhone;