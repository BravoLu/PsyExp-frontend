import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface Props {
  children: ReactNode;
}

interface GlobalState {
  isLogin: boolean;
  uid: string;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<GlobalState | undefined>(undefined);

// TODO: figure out it.
export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [uid, setUid] = useState<string>("0")

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid !== null && uid !== "0") {
      setIsLogin(true);
      setUid(uid);
    } else {
      setIsLogin(false);
      setUid("0");
    }
  });

  const contextValue: GlobalState = {
    uid,
    isLogin,
    setIsLogin
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a GlobalProvider");
  }
  return context;
};
