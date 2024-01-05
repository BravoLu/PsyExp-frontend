import axios, { AxiosResponse } from "axios";

export function getTimeGap(timestamp: string) {
  const currentTime = new Date().getTime();
  const timestampDiff = currentTime - Date.parse(timestamp);

  const seconds = Math.floor(timestampDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Return a human-readable string
  if (days > 0) {
    return `updated ${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `updated ${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `updated ${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return `updated ${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
}

export const checkPasswordStrength = (password: string): number => {
  // Implement your password strength logic here
  // Example: Check for minimum length and the presence of numbers and special characters
  if (password.length === 0) {
    return 0;
  }
  if (password.length < 8) {
    return 1;
  }

  if (/^(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
    return 3;
  }

  return 2;
};

export const getProgressBarColor = (strength: number): string => {
  switch (strength) {
    case 1:
      return "red.400";
    case 2:
      return "orange.400";
    case 3:
      return "green.400";
    default:
      return "gray.300";
  }
};

export const getExpStatusColor = (status: string | number): string => {
  switch (status) {
    case "Invalid":
      return "gray";
    case "Draft":
      return "blue";
    case "Published":
      return "orange";
    case "Finished":
      return "green";
    case "Closed":
      return "red";
    default:
      return "gray";
  }
};

interface precheckRsp {
  code: number;
  msg: string;
  uid: string;
}

export const precheck = (email: string): Promise<precheckRsp> => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        email: email,
      };
      const resp: AxiosResponse<precheckRsp> = await axios.post(
        `http://${config.apiUrl}/exist`,
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
