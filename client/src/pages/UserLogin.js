import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userlogin } from "../redux/features/userSlice";

const initialState = {
    email: "",
    password: ""
};


const UserLogin = () => {
    const [formData, setFormData] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.user }))
    const { email, password } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(userlogin({ formData, navigate, toast }))
        }
    };

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }}>
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle" className="fa-2x" />
                <h5>Sign In as User</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <div className="col-md-12">
                            <MDBInput
                                label=" User Email"
                                type="email"
                                value={email}
                                name="email"
                                onChange={onInputChange}
                                required
                                invalid="true"
                                validation="Please provide your email"
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
                                invalid="true"
                                validation="Please Enter your password"
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }} className="mt-2">
                                {loading && (
                                    <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                                )}
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>

                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/usersignup"><p>Don't have an account? Sign Up</p></Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}
export default UserLogin;