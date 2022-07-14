import React from "react";
import { MDBCard, MDBBtn} from "mdb-react-ui-kit";
import { Link,useNavigate } from "react-router-dom";


const RegisterComponent = ()=>{
    const navigate = useNavigate();
    const onSelectDealer = ()=>{navigate("/dealersignup")}
    const onSelectUser = ()=>{navigate("/usersignup")}
    return (
        <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"150px"}}>
            <MDBCard alignment="center">
                <h5>Sign Up As ?</h5>
                <div>
                    <MDBBtn style={{marginRight:"10px"}} onClick={onSelectDealer}>DEALER</MDBBtn>
                    <MDBBtn style={{marginLeft:"10px"}} onClick={onSelectUser}>USER</MDBBtn>
                </div>
                <Link to="/selectsignin" style={{marginTop:"10px"}}><p>Already have an account? Log In </p></Link>

            </MDBCard>
        </div>
    )

}
export default RegisterComponent;