import React, { useEffect } from "react";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBtn, MDBCardGroup } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removefromcart, addonecart, removeonecart, getcart, emptycart } from "../redux/features/userSlice";

const cartData = {
    userId: "",
    amount: ""
}
const RemoveData = {
    userId: ""
}
const Cart = () => {
    const { user, cartItems } = useSelector((state) => ({ ...state.user }))
    const dispatch = useDispatch();
    const userId = user?.result?._id;

    const handleRemove = (id) => {
        RemoveData.userId = userId;
        console.log(RemoveData);
        dispatch(removefromcart({ id, RemoveData, toast }))
    }
    const handleEmpty = ()=>{
        dispatch(emptycart({userId,toast}))
    }
    useEffect(() => {
        dispatch(getcart(userId))
    },[userId])
    return (
        <div className="cart">
            {cartItems.length === 0 && (
                <h3 className="text-center">{user?.result?.name}: Your Cart Is Empty</h3>
            )}
            {cartItems.length > 0 && (
                <>
                    <div style={{display:"flex",justifyContent:"space-evenly",marginTop: "20px"}}>
                        <h3 className="text-start">Cart: {user?.result?.name}</h3>
                        <MDBBtn float="right" color="danger" onClick={handleEmpty}>Empty Cart</MDBBtn>
                    </div>
                    <hr style={{ maxWidth: "600px",marginTop: "10px",marginBottom:"20px",margin:"auto" }} />
                </>
            )}
            {cartItems && cartItems.map((item) => (
                <MDBCardGroup key={item._id}>
                    <MDBCard style={{ maxWidth: "600px", marginTop: "10px",marginBottom:"10px",margin:"auto",border:"2px solid grey" }}>
                        <MDBRow className="g-0">
                            <MDBCol md="4">
                                <MDBCardImage
                                    className="rounded img"
                                    src={item.imageFile}
                                    alt={item.company}
                                    fluid
                                />
                            </MDBCol>
                            <MDBCol md="4">
                                <MDBCardBody>
                                    <MDBCardTitle className="text-start">{item.company} {item.name}</MDBCardTitle>
                                    <MDBCardText className="text-start">
                                        <p className="text-muted">RAM: {item.RAM}</p>
                                        <p className="text-muted">Storage: {item.storage}</p>
                                        <p className="text-muted">Camera: {item.camera}</p>
                                        <p className="text-muted">Price: {item.price}</p>
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCol>
                            <MDBCol md="4">
                                <div style={{ marginLeft: "5px", float: "right", marginTop: "40px" }}>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Amount: Rs{item.amount}</p>
                                    <MDBBtn style={{ marginRight: "5px", marginTop: "5px", marginBottom: "5px" }}
                                        onClick={() => {
                                            cartData.userId = userId;
                                            cartData.amount = item.price;
                                            const id = item._id;
                                            dispatch(addonecart({ id, cartData })).then(()=>{
                                                dispatch(getcart(userId))
                                            })
                                            
                                        }}>
                                        ADD ONE MORE</MDBBtn>
                                    <MDBBtn style={{ marginLeft: "5px", marginTop: "5px", marginBottom: "5px" }}
                                        onClick={() => {
                                            cartData.userId = userId;
                                            cartData.amount = item.price;
                                            const id = item._id;
                                            dispatch(removeonecart({ id, cartData })).then(()=>{
                                                if(item.quantity>1){
                                                    dispatch(getcart(userId));
                                                }else if(item.quantity===1){
                                                    handleRemove(item._id);
                                                    dispatch(getcart(userId));
                                                }
                                            })
                                        }}>REMOVE ONE</MDBBtn>
                                    <MDBBtn color="danger" style={{ marginLeft: "5px", marginTop: "5px", marginBottom: "5px" }} onClick={() => handleRemove(item._id)}>REMOVE</MDBBtn>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))}
        </div>
    )
}
export default Cart;