import { useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const SendMoney = () => {
  const {
    state: { user, amount },
  } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: 0,
  });
  const onHandleChange = (event) => {
    setFormData({ amount: Number(event.target.value) });
  };
  const onHandleSubmit = async (event) => {
    event.preventDefault();
    if (formData.amount > amount) {
      alert("You don't have enough balance");
    } else {
      const token = document.cookie.split("Authorization=")[1];
      const res = await fetch("/api/v1/account/transfer", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: user._id,
          amount: formData.amount,
        }),
      });
      const success = await res.json();
      console.log(success);
      if (success.message) {
        setFormData({ amount: 0 });
        navigate("/dashboard");
      }
    }
  };
  return (
    <div className="grid grid-rows-3 grid-cols-4 h-screen">
      <div className="container col-start-2 col-span-2 row-span-3 my-12 w-[60%] min-h-min mx-auto rounded-md bg-slate-50 p-4">
        <div className="intro text-center m-6 px-6">
          <h2 className="capitalize font-black text-3xl text-gray-800 mb-4">
            Send Money
          </h2>
          <p className="text-lg text-black-600 mb-8">
            Sending money to
            <span className="block font-black">
              {user?.firstName} {user.lastName}
            </span>
          </p>
        </div>
        <form className="px-3" method="post" onSubmit={onHandleSubmit}>
          <CustomInput
            name="amount"
            label="Amount"
            type="Number"
            value={formData.amount}
            required={true}
            onHandleChange={onHandleChange}
          />
          <CustomButton clazz="bg-green-500" text="Send" />
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
