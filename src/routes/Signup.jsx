import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const setUser = useSetRecoilState(userAtom);

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const { user } = await response?.json();
    setUser(user);
    const token = response?.headers?.get("Authorization");
    document.cookie = `Authorization=${token}; Secure; SameSite=Strict`;
  };

  const onHandleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="grid grid-rows-3 grid-cols-4 h-screen">
      <div className="container col-start-2 col-span-2 row-span-3 my-12 w-[60%] min-h-min mx-auto rounded-md bg-slate-50 p-4">
        <div className="intro text-center m-6 px-6">
          <h2 className="capitalize font-black text-3xl text-gray-800 mb-4">
            Sign up
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Enter your information to create an account
          </p>
        </div>
        <form className="px-3" method="post" onSubmit={onHandleSubmit}>
          <CustomInput
            name="firstName"
            label="first name"
            type="text"
            required={true}
            value={formData.firstName}
            onHandleChange={onHandleChange}
          />
          <CustomInput
            name="lastName"
            label="last name"
            type="text"
            value={formData.lastName}
            required={true}
            onHandleChange={onHandleChange}
          />
          <CustomInput
            name="username"
            label="UserName"
            type="text"
            value={formData.username}
            required={true}
            onHandleChange={onHandleChange}
          />
          <CustomInput
            name="password"
            label="password"
            type="password"
            value={formData.password}
            required={true}
            onHandleChange={onHandleChange}
          />
          <CustomButton text="Sign up" />
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?
          <Link to="/signin" className="text-stone-900 hover:text-gray-700">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
