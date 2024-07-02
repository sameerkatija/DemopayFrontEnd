import { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms";

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const setUser = useSetRecoilState(userAtom);
  const onHandleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/v1/user/signin", {
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
            Sign In
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Enter your credentials to access your account
          </p>
        </div>
        <form className="px-3" method="post" onSubmit={onHandleSubmit}>
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
          <CustomButton text="Sign In" />
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?
          <Link to="/signup" className="text-stone-900 hover:text-gray-700">
            {" "}
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
