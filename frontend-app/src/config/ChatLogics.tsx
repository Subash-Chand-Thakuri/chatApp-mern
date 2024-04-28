import { User } from "../Context/ContextProvider";

export const getSender = (loggedUser: User, users: User[]) => {
  if (!loggedUser || !users || users.length < 2) {
    return '';
  }
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}
