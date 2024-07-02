import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const token = document.cookie.split("Authorization=")[1];

export const userAtom = atom({
  key: "user",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const allUsersAtom = atom({
  key: "all_user",
  default: async () => {
    const responce = await fetch("/api/v1/user/bulk", {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        // Add other headers as needed
      },
    });
    const users = await responce.json();
    return users;
  },
});

export const userBalanceAtom = atom({
  key: "user_balance",
  default: async () => {
    const responce = await fetch("/api/v1/account/balance", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const balance = await responce.json();
    return balance;
  },
});
