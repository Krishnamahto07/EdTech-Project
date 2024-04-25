import toast from "react-hot-toast";
// import { useDispatch } from "react-redux"
import { apiConnector } from "../apiConnector";
import {setToken ,setLoading} from "../../redux/slices/authSlice"
import { endpoints } from "../apis";
import { setUser } from "../../redux/slices/profileSlice";
const {LOGIN_API ,SENDOTP_API} = endpoints

export function login(email,password,navigate){
    // const dispatch = useDispatch();
    return async(dispatch) =>{
        const toastId = toast.loading("Loading ...")
        // dispatch()
        try {
            const response = await apiConnector("POST",LOGIN_API,{
                email,password,
            })
            console.log("Login api response .. ",response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Login Successfull");
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image ? 
            response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({...response.data.user,image:userImage}))
            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        toast.dismiss(toastId)
    }
}

export function sendOtp(email, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SENDOTP_API, {email, checkUserPresent: true,})
        console.log("SENDOTP API RESPONSE............", response)
      
        if(!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      }
       catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }