import React, { useEffect } from "react";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBtn, MDBCardGroup } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dealersphone, deletephone, getphone, setPhoneEmpty } from "../redux/features/phoneSlice";
import { toast } from "react-toastify";
const Dashboard = () => {
    const { dealerPhones } = useSelector((state) => ({ ...state.phone }))
    const { dealer } = useSelector((state) => ({ ...state.dealer }))
    const dealerId = dealer?.result?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(dealerId){
            dispatch(dealersphone(dealerId));
        }
    },[dealerId])

    const handleDelete = (id)=>{
        if(window.confirm("Are you sure you want to delete this phone ?")){
            dispatch(deletephone({id,toast}))
            dispatch(setPhoneEmpty())
        }
    }
    const handleUpdate = (id)=>{
        dispatch(getphone(id))
        navigate(`/updatephone/${id}`)
    }

    return (
        <div className="dashboard">
            {dealerPhones.length === 0 && (
                <h3>No Phone available with the Dealer: {dealer?.result?.name} </h3>
            )}
            {dealerPhones.length > 0 && (
                <>
                    <h5 className="text-center" style={{marginTop:"10px"}}>Dashboard: {dealer?.result?.name}</h5>
                    <hr style={{ maxWidth: "600px",margin:"auto",marginBottom:"20px"}} />
                </>
            )}
            {dealerPhones && dealerPhones.map((item) => (
                <MDBCardGroup key={item._id}>
                    <MDBCard style={{ maxWidth: "600px",marginTop:"20px",margin:"auto",marginTop:"10px",marginBottom:"10px",border:"2px solid grey" }}>
                        <MDBRow className="g-0">
                            <MDBCol md="4">
                                <MDBCardImage
                                    className="rounded"
                                    src={item.imageFile}
                                    alt={item.company}
                                    style={{height:"100%"}}
                                    fluid
                                />
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCardBody>
                                    <MDBCardTitle className="text-start">{item.company} {item.name}</MDBCardTitle>
                                    <MDBCardText className="text-start">
                                        <p className="text-muted">RAM: {item.RAM}</p>
                                        <p className="text-muted">Storage: {item.storage}</p>
                                        <p className="text-muted">Camera: {item.camera}</p>
                                        <p className="text-muted">Price: {item.price}</p>
                                        <p className="text-muted">Stock: {item.stock}</p>
                                    </MDBCardText>
                                    <div style={{ marginLeft: "5px", float: "right", marginTop: "-60px" }}>
                                            <MDBBtn style={{marginRight:"5px"}} onClick={()=>handleUpdate(item._id)}>Update</MDBBtn>
                                            <MDBBtn color="danger" style={{marginLeft:"5px"}} onClick={()=>handleDelete(item._id)}>Delete</MDBBtn>
                                    </div>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))}
        </div>
    )
}
export default Dashboard;