import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { checkToken } from '../../store/actions';

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector(state => state.userReducer.accessToken)

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/users/login",
        data: form,
      });

      const access_token = data.access_token;
      localStorage.setItem("access_token", access_token);
      dispatch(checkToken())

      navigate('/boards')
    } catch (error) {
      setIsError(error.response.data.message)
    }
  };

  useEffect(() => {
    if (accessToken) {
      navigate('/boards')
    }
  }, [accessToken, navigate])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto text-center">
          <form onSubmit={e => loginUser(e)}>
            <img
              src={
                "https://logos-world.net/wp-content/uploads/2021/03/Trello-Logo.png"
              }
              alt=""
              className="logo mb-4"
            />
            <h5 className="mb-3">Log in to continue</h5>
            {isError && <p className="mt-4" style={{color: 'red'}}>{isError}</p>}
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mb-4"
            >
              Continue
            </button>
            <h3 className="mb-3">OR</h3>
            <button className="btn btn-light w-100 google-button">
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                }
                alt="Google Logo"
                className="google-logo"
              />
              <span className="google-button-text">Continue with Google</span>
            </button>
            <p className="mt-4">
              Don't have an account?
              <Link to="/register" className="account">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
