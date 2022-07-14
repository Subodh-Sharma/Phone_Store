import React from "react";
import { MDBCard, MDBBtn} from "mdb-react-ui-kit";
import { Link,useNavigate } from "react-router-dom";


const LoginComponent = ()=>{
    const navigate = useNavigate()
    const onSelectDealer = ()=>{navigate("/dealersignin")}
    const onSelectUser = ()=>{navigate("/usersignin")}
    return (
        <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"150px"}}>
            <MDBCard alignment="center">
                <h5>Sign In As ?</h5>
                <div>
                    <MDBBtn style={{marginRight:"10px"}} onClick={onSelectDealer}>DEALER</MDBBtn>
                    <MDBBtn style={{marginLeft:"10px"}} onClick={onSelectUser}>USER</MDBBtn>
                </div>
                <Link to="/selectsignup" style={{marginTop:"10px"}}><p>Don't have an account? Sign Up </p></Link>

            </MDBCard>
        </div>
    )

}
export default LoginComponent;