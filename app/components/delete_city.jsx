import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import axios from "axios"
import { BACKEND_BASE_URL } from "../context/context"
import { useRouter } from "next/navigation"

export const DeleteCity = ({setIsLoading, isModelOpen, setIsModelOpen, id})=>{
    const router = useRouter()
    const handleClick = async()=>{
        setIsLoading(true)
        let toastMessage=""
        try {
            let response = await axios.delete(`${BACKEND_BASE_URL}/weather/city?id=${Number(id)}`,{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })
            setIsLoading(false)
            toastMessage = "City Deleted successfully !!!"
            alert(toastMessage)
            router.push("/")
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            if(error.response){
                const {data} = error.response
                toastMessage = data.message
            }
            else if(error.message){
                toastMessage = error.message
            }
            else{
                toastMessage = "Something went wrong"
            }
        }
        setIsModelOpen(false)
        alert(toastMessage)
    }
    return(
        <AlertDialog open={isModelOpen} onOpenChange={setIsModelOpen}>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this city from your list.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
