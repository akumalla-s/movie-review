import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RegistrationForm.css";

export default function RegistrationForm() {
  let navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const findAllUsersUrl =
    "https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/users";
  const createUserUrl =
    "https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/users";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTkzMWM4NjY5ZjJjZjM0N2YyNmMyZCIsInVzZXJuYW1lIjoiMDAyNzk4MTY2UyIsImlhdCI6MTcwMDM0NDI2OCwiZXhwIjoxNzAxNjQwMjY4fQ.3YuL_w8ovVtTfS0RvFuPSf-f1DbXF4jL16hGqmJyJIo";
  const config = { headers: { Authorization: `${token}` } };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(findAllUsersUrl, config);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  let [userRegistrationError, setUserRegistrationError] = useState();

  const validateForm = () => {
    let errors = {};
    const usernameregex = /^[a-zA-Z0-9_-]{4,20}$/;

    // Validate username
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else if (!usernameregex.test(formData.username.trim())) {
      errors.username = "Invalid username";
    }

    // Validate password
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    // Validate confirm password
    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const user = {
    username: formData.username,
    password: formData.password,
    isAdmin: false,
    isActive: true,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the username already exists
    const isUsernameTaken = users.some(
      (existingUser) => existingUser.username === formData.username
    );

    if (validateForm()) {
      if (isUsernameTaken) {
        setUserRegistrationError(
          "Username already exists. Please choose a different username."
        );
        return;
      }else{
        setUserRegistrationError('');
      }
      console.log(user);
      var response = await axios.post(createUserUrl, user, config);
      console.log(response);

      if (response.data.message) {
        console.log(response.data.message === "Document created successfully");
        navigate("/registration-success");
      } else {
        setUserRegistrationError(response.data.message);
      }
    }
  };

  return (
    <div className="registration-form">
      <h2 className="registration-title">Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <p>
            You can use 4 or more characters with a mix of letters, numbers,
            underscores and hyphens{" "}
          </p>
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <div className="error">
            {formErrors.username && <span>{formErrors.username}</span>}
            <br />
            {userRegistrationError && <span>{userRegistrationError}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="error">
            {formErrors.password && <span>{formErrors.password}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            className="input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div className="error">
            {formErrors.confirmPassword && (
              <span>{formErrors.confirmPassword}</span>
            )}
          </div>
        </div>
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}
