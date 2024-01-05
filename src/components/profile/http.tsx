import axios, { AxiosResponse } from "axios";
import { User } from "../user/user";
import config from "../../config";

interface updateUserReq {
  extra?: string;
  phone_number?: string;
}

interface updateUserRsp {
  code: number;
  msg: string;
}

export const updateUser = (req: updateUserReq): Promise<updateUserRsp> => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp: AxiosResponse<updateUserRsp> = await axios.post(
        `http://${config.apiUrl}/updateUser`,
        req,
        {
          withCredentials: true,
        }
      );
      resolve(resp.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const profile = (): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp: AxiosResponse<User> = await axios.get(
        `http://${config.apiUrl}/myprofile`,
        {
          withCredentials: true,
        }
      );
      resolve(resp.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getUser = (uid: string): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp: AxiosResponse<User> = await axios.post(
        `http://${config.apiUrl}/user`,
        {
          uid: Number(uid),
        },
        {
          withCredentials: true,
        }
      );
      resolve(resp.data);
    } catch (error) {
      reject(error);
    }
  });
};

export interface RegisterReq {
  user_info: User;
  password: string;
}

interface RegisterRsp {
  code: number;
  msg: string;
}

export const register = (data: RegisterReq): Promise<RegisterRsp> => {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const body = {
        user_info: {
          email: data.user_info.email,
          phone_number: data.user_info.phone_number,
          user_name: data.user_info.user_name,
          gender: Number(data.user_info.gender),
        },
        password: data.password,
      };
      const resp: AxiosResponse<RegisterRsp> = await axios.post(
        `http://${config.apiUrl}/register`,
        body,
        {
          headers: headers,
        }
      );
      resolve(resp.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

interface QueryUsersRsp {
  code: number;
  msg: string;
  users: User[];
}

export const queryUsers = (uids: number[]): Promise<QueryUsersRsp> => {
  return new Promise(async (resolve, reject) => {
    try {
      const rsp: AxiosResponse<QueryUsersRsp> = await axios.post(
        `http://${config.apiUrl}/queryUsers`,
        { uids: uids },
        { withCredentials: true }
      );
      resolve(rsp.data);
    } catch (error) {
      reject(error);
    }
  });
};
