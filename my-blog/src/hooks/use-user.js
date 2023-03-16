import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth"


const useUser = () => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setIsLoading(false);
        })

        return unsubscribe;
    },[]);

    const getToken = async() => {
        return user?.getIdToken ? await user.getIdToken() : null;
    };
    const logOut = async() =>  {
       await signOut(getAuth());
       setUser(null);
    }

return {user, isLoading, logOut, getToken};
}

export default useUser;