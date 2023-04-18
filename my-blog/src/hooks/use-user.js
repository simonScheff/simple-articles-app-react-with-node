import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";

let baseUserData = null;
let userDataPrev = null;
const useUser = (componentName) => {
  const [user, setUser] = useState(baseUserData);
  const [userData, setUserData] = useState(userDataPrev);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (userDTO) => {
      setIsLoading(false);
      if (
        (userDTO?.email && user?.email !== userDTO.email) ||
        (userDTO && !userData)
      ) {
        setUser(userDTO);
        const authtoken = await userDTO.getIdToken();
        const res = await axios.get(`http://localhost:8000/api/user`, {
          headers: { authtoken },
        });
        updateUserData(res.data);
      }
      baseUserData = userDTO;
      setUser(userDTO);
    });

    return unsubscribe;
  }, []);

  const getToken = async () => {
    return user?.getIdToken ? await user.getIdToken() : null;
  };
  const logOut = async () => {
    await signOut(getAuth());
    setUser(null);
    setUserData(null);
  };

  const updateUserData = (data) => {
    userDataPrev = data ? data : userDataPrev;
    setUserData(data);
  };

  return { user, userData, isLoading, logOut, getToken, updateUserData };
};

export default useUser;
