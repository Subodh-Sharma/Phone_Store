import React, { useState,useEffect } from "react";
import { MDBCard, MDBCardImage, MDBInput, MDBValidation,MDBBtn,MDBSpinner } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import { updatephone } from "../redux/features/phoneSlice";
import { toast } from "react-toastify";

const initialState = {
    price: "",
    stock: ""
}
const UpdatePhone = () => {
    const [input, setInput] = useState(initialState);
    const { phone,loading } = useSelector((state) => ({ ...state.phone }))
    const {price,stock} = input;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();    

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(price && stock){
            const updatedPhoneData = ({...input})
            dispatch(updatephone({id,updatedPhoneData,navigate,toast}))
        }
    }

    return (
        <div style={{ margin: "auto", padding: "120px", maxWidth: "600px", alignContent: "center" }}>
            <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
                <MDBCardImage src={phone?.imageFile} alt={phone?.company} position="top" style={{ maxWidth: "100%", height: "180px" }} />
                <div className="text-center">{phone?.company} {phone?.name}</div>
                <div className="text-center">RAM: {phone?.RAM}</div>
                <div className="text-center">Storage: {phone?.storage}</div>
                <div className="text-center">Camera: {phone?.camera}</div>
                <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">


                    <div className="col-md-12">Price:
                        <MDBInput
                            label="Updated Price"
                            type="Number"
                            value={price}
                            name="price"
                            onChange={onInputChange}
                            required
                            invalid="true"
                            validation="Please provide Updated Price"
                        />
                    </div>
                    <div className="col-md-12">Stock:
                        <MDBInput
                            label="Updated Stock"
                            type="Number"
                            value={stock}
                            name="stock"
                            onChange={onInputChange}
                            required
                            invalid="true"
                            validation="Please provide Updated Stock"
                        />
                    </div>
                    <div className="col-12">
                        <MDBBtn style={{ width: "100%" }} className="mt-2">
                            {loading && (
                                <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                            )}
                            UPDATE
                        </MDBBtn>
                    </div>
                </MDBValidation>
            </MDBCard>
        </div>
    )
}

export default UpdatePhone;