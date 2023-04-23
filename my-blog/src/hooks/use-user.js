import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";

let baseUserData = null;
let userDataPrev = null;
const useUser = () => {
  const [user, setUser] = useState(baseUserData);
  const [userData, setUserData] = useState(userDataPrev);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (userDTO) => {
      if (
        (userDTO?.email && user?.email !== userDTO.email) ||
        (userDTO && !userData)
      ) {
        setUser(userDTO);
        const authtoken = await userDTO.getIdToken();
        const res = await axios.get(`http://localhost:8000/api/user`, {
          headers: { authtoken },
        });
        if (res.data?.userName) {
          updateUserData(res.data);
        } else {
          console.log("no user data");
        }
      }
      baseUserData = userDTO;
      setUser(userDTO);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const updateServer = async (userName, email) => {
      try {
        await axios.post(
          "http://localhost:8000/api/user",
          { userName, email },
          { headers: { authtoken: await getToken() } }
        );
        setIsLoading(false);
      } catch (e) {
        alert(e.message);
      }
    };

    if (userData) {
      setIsLoading(true);
      updateServer(userData.userName, userData.email);
    }
  }, [userData]);

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
