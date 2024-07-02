import { selector } from "recoil";
import { allUsersAtom, userBalanceAtom } from "./atoms";

export const friendArraySelector = selector({
  key: "Friend Array Selector",
  get: async ({ get }) => {
    const arr = await get(allUsersAtom)();
    return arr.users;
  },
});

export const userBalanceSelector = selector({
  key: "get_balance_selector",
  get: async ({ get }) => {
    const balance = await get(userBalanceAtom)();
    return balance;
  },
});
