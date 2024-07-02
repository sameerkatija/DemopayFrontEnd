import { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import Navbar from "../components/Navbar";
import { useRecoilValue } from "recoil";
import { friendArraySelector, userBalanceSelector } from "../store/selectors";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [friend, setFriend] = useState("");
  const [friendArr, setFriendArr] = useState([]);
  const onHandleChange = (event) => {
    setFriend(event.target.value);
  };
  const usersArr = useRecoilValue(friendArraySelector);
  const { balance } = useRecoilValue(userBalanceSelector);

  useEffect(() => {
    setFriendArr(usersArr);
    console.log(usersArr);
  }, [usersArr]);

  useEffect(() => {}, [balance]);

  const navigate = useNavigate();

  const handleTransfer = (user) => {
    // Navigate to /transfer route with userId as a parameter
    navigate(`/send`, { state: { user, amount: balance } });
  };
  // useEffect(() => {

  // }, [balance])

  return (
    <div>
      <Navbar />
      <div className="p-4 text-white">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Your Balance: {Math.floor(balance)}
          </h2>
        </div>
        <div>
          <CustomInput
            label="Users"
            value={friend}
            name="balance"
            onHandleChange={onHandleChange}
            required={true}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">List of Users:</h2>

          {friendArr &&
            friendArr.map((frnd) => (
              <div
                key={frnd._id}
                className="flex justify-between rounded-lg bg-white text-black p-2 m-4"
              >
                <div className="block text-lg content-center ">
                  {frnd.firstName} {frnd.lastName}
                </div>
                <div>
                  <CustomButton
                    text="Send Money"
                    onClick={() => handleTransfer(frnd)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
