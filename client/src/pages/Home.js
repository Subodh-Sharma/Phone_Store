import React, { useEffect } from "react";
import {MDBCol,MDBContainer,MDBRow,MDBTypography} from "mdb-react-ui-kit";
import { useSelector,useDispatch } from "react-redux";
import PhoneCard from "../components/PhoneCard";
import { getphones } from "../redux/features/phoneSlice";
import Spinner from "../components/Spinner";
const Home =()=>{
    const {user} = useSelector((state)=>({...state.user}));
    const {dealer} = useSelector((state)=>({...state.dealer}));
    const {phones,loading} = useSelector((state)=>({...state.phone}));
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getphones());
    },[])
    if (loading) {
        return <Spinner />;
      }
    var Name = user?.result?.name || dealer?.result?.name;
    return(
        <>
        { Name && (
            <div style={{marginLeft:"auto",alignContent:"center",marginTop:"10px",textAlign:"center"}}><h3>Welcome : {Name}</h3></div>
        )}
        <div style={{margin:"auto",padding:"30px",maxWidth:"1000px",alignContent:"center"}}>
            <MDBRow className="mt-5">
                {phones.length===0 && (
                    <MDBTypography className="text-center mb-0" tag="h2">No Phones Found</MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-2" style={{marginRight:"20px"}}>
                            {phones && phones.map((item)=><PhoneCard key={item._id}{...item}/>)}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        </div>
        </>
    )
}
export default Home;