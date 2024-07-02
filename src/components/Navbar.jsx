import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms";

const Navbar = () => {
  const user = useRecoilValue(userAtom);
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Left side: Logo or title */}
      <div className="flex items-center">
        <span className="text-white text-lg font-semibold">DemoPay</span>
      </div>

      {/* Right side: Greeting and icon */}
      <div className="flex items-center">
        <span className="text-white mr-2">
          Hello, {user?.firstName?.length > 0 && user?.firstName}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
