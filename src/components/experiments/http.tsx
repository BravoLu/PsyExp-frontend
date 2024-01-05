import axios, { AxiosResponse } from "axios";
import { ExpInfo, SubInfo, ExpStats } from "./entity";
import config from "../../config";

interface queryExpRsp {
  code: number;
  msg: String;
  exp: ExpInfo;
  subs: SubInfo[];
  subs_num: number;
  finished_num: number;
}

// call http
export const queryExp = (eid: string): Promise<queryExpRsp> => {
  return new Promise<queryExpRsp>(async (resolve, reject) => {
    try {
      const data = {
        eid: Number(eid),
      };
      const resp: AxiosResponse<queryExpRsp> = await axios.post(
        `http://${config.apiUrl}/queryExp`,
        data,
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

interface addSubRsp {
  code: number;
  msg: string;
}

export const addSub = (eid: string): Promise<addSubRsp> => {
  return new Promise<addSubRsp>(async (resolve, reject) => {
    try {
      const data = {
        eid: eid,
        pid: localStorage.getItem("uid"),
      };
      const resp: AxiosResponse<addSubRsp> = await axios.post(
        `http://${config.apiUrl}/addSub`,
        data,
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

interface updateExpRsp {
  code: number;
  msg: string;
}

export const updateExp = (exp: ExpInfo): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp: AxiosResponse<updateExpRsp> = await axios.post(
        `http://${config.apiUrl}/updateExp`,
        exp,
        {
          withCredentials: true,
        }
      );
      resolve(resp.data.code);
    } catch (error) {
      reject(error);
    }
  });
};

interface querySubRsp {
  code: number;
  msg: string;
}

export const querySub = (sub: SubInfo): Promise<querySubRsp> => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp: AxiosResponse<querySubRsp> = await axios.post(
        `http://${config.apiUrl}/querySub`,
        sub,
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

interface addExpRsp {
  code: number;
  msg: string;
  eid: number;
}

export const addExp = (data: ExpInfo): Promise<addExpRsp> => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp: AxiosResponse<addExpRsp> = await axios.post(
        `http://${config.apiUrl}/addExp`,
        data,
        {
          withCredentials: true,
        }
      );
      resolve(resp.data);
    } catch (error) {
      console.error("Error: ", error);
      reject(error);
    }
  });
};

interface queryExpsReq {
  rid: number;
  page_index: number;
  page_size: number;
  state: number;
  order_type: number;
}

interface queryExpsRsp {
  exps: ExpInfo[];
  code: number;
  msg: string;
  total_num: number;
  stats: ExpStats;
}

export const queryExps = (data: queryExpsReq): Promise<queryExpsRsp> => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp: AxiosResponse<queryExpsRsp> = await axios.post(
        `http://${config.apiUrl}/queryExps`,
        data,
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

export const updateSub = (sid: string, state: number) => {
  return new Promise((resolve, reject) => {
    try {
      const data = {
        sid: sid,
        state: state,
      };
      const resp = axios.post(`http://${config.apiUrl}/updateSub`, data, {
        withCredentials: true,
      });
      resolve(resp);
    } catch (error) {
      reject(error);
    }
  });
};
