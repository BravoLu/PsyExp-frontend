export const State2Number = (state: string) => {
  switch (state) {
    case "STATE_SUB_INIT":
      return "1";
    case "STATE_SUB_FINISHED":
      return "2";
    case "STATE_SUB_APPROVED":
      return "3";
    case "STATE_SUB_RETURNED":
      return "5";
    default:
      return "0";
  }
};

export const Number2State = (number: string) => {
  switch (number) {
    case "1":
      return "STATE_SUB_INIT";
    case "2":
      return "STATE_SUB_FINISHED";
    case "3":
      return "STATE_SUB_APPROVED";
    case "5":
      return "STATE_SUB_RETURNED";
    default:
      return "STATE_SUB_INVALID";
  }
};
