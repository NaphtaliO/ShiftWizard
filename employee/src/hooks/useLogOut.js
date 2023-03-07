import { useDispatch } from "react-redux";
import { logOut } from "../state_management/userSlice";

export const useLogout = () => {
    const dispatch = useDispatch();
    
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('employee')

        // dispatch logout action
        dispatch(logOut())
    }

    return { logout }
}