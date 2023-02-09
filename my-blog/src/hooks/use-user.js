import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged} from "firebase/auth"


const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setIsLogin(true);
        })

        return unsubscribe;
    },[]);

    return {user, isLogin};
}

export default useUser;