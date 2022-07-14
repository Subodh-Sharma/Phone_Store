import React from "react";
import { MDBCard, MDBCardImage, MDBCardGroup, MDBBtn } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { addincart } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const cartData = {
    userId: "",
    phoneId: "",
    amount: "",
    name: "",
    company: "",
    RAM: "",
    storage: "",
    camera: "",
    imageFile: "",
    price: ""
}

const PhoneCard = ({ _id, name, company, RAM, storage, camera, imageFile, price, dealer,stock }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state.user }))
    const userId = user?.result?._id;
    cartData.userId = userId;
    return (
        <MDBCardGroup>
            <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem",border:"2px solid grey" }}>
                <MDBCardImage
                    src={imageFile} alt={name} position="top" style={{ maxWidth: "100%", height: "180px" }}
                />
                <div className="text-center">{company} {name}</div>
                <div className="text-center">RAM: {RAM}</div>
                <div className="text-center">Storage: {storage}</div>
                <div className="text-center">Camera: {camera}</div>
                <div className="text-center">Price: Rs {price}</div>
                <div className="text-center">Dealer: {dealer}</div>
                <div className="text-center">Stocks: {stock}</div>

                    <MDBBtn onClick={() => {
                        if (userId) {
                            cartData.phoneId = _id;
                            cartData.amount = price;
                            cartData.name = name;
                            cartData.company = company;
                            cartData.RAM = RAM;
                            cartData.storage = storage;
                            cartData.camera = camera;
                            cartData.imageFile = imageFile;
                            cartData.price = price;
                            dispatch(addincart({ cartData, navigate, toast }))
                        } else {
                            window.alert("You need to Login as user to buy product.")
                            return;
                        }
                    }}>
                        ADD TO CART</MDBBtn>
            </MDBCard>
        </MDBCardGroup>
    )
}
export default PhoneCard;