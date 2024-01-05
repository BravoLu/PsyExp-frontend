import axios, { AxiosResponse } from "axios";
import { SubInfo } from "../experiments/entity";
import config from "../../config";

interface Props {
  pid: number;
  page_index: number;
  page_size: number;
  state: number;
}

interface querySubsRsp {
  subs: SubInfo[];
  total_num: number;
}

export const querySubs = (props: Props): Promise<querySubsRsp> => {
  return new Promise(async (resolve, reject) => {
    try {
      const rsp: AxiosResponse<querySubsRsp> = await axios.post(
        `http://${config.apiUrl}/querySubs`,
        props,
        {
          withCredentials: true,
        }
      );
      resolve(rsp.data);
    } catch (error) {
      reject(error);
    }
  });
};
