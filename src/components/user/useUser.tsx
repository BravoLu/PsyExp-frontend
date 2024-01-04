import { useEffect, useState } from "react";
import { User } from "./user";
import { getUser, queryUsers } from "../profile/http";

export const useUsers = () => {
  const [uids, setUids] = useState<number[]>([]);
  const [users, setUsers] = useState(new Map());
  useEffect(() => {
    queryUsers(uids)
      .then((rsp) => {
        const mapFromArr = new Map();
        rsp.users.forEach((item) => mapFromArr.set(item.uid, item))
        setUsers(mapFromArr);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [uids]);
  return { uids, setUids, users };
};

const useUser = () => {
  const [uid, setUid] = useState<string>("0");
  const [user, setUser] = useState<User>({
    email: "",
    phone_number: "",
    user_name: "",
    gender: "",
    state: "",
    extra: "",
  });
  useEffect(() => {
    getUser(uid)
      .then((rsp) => {
        setUser(rsp);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [uid]);

  return { user, uid, setUser, setUid };
};

export default useUser;
