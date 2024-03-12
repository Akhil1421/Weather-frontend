import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useRef } from "react"
import { BACKEND_BASE_URL } from "../context/context"
import { useToast } from "@/components/ui/use-toast"

export default function AddCity({setIsLoading, isModelOpen, setIsModelOpen, setIsCityDataChanged}) {
  const country = useRef()
  const city = useRef()
  const {toast} = useToast()
  const handleClick = async()=>{
    let body = {
      name : city.current.value,
      country : country.current.value
    }
    if(!body.name.length || !body.country.length){
      alert("City name and country name can't be empty")
      return
    }
    setIsLoading(true)
    let toastMessage = ""
    try {
      let response = await axios.post(`${BACKEND_BASE_URL}/weather/city`,body,{
        headers : {
          'token': localStorage.getItem('token')
        }
      })
      setIsCityDataChanged((prev)=>!prev)
      setIsLoading(false)
      toastMessage = "City Added successfully !!!"
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
    toast({
      description: toastMessage,
      duration : 5000,
    })
    alert(toastMessage)
  }
  return (
    <Dialog open={isModelOpen} onOpenChange={setIsModelOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add City</DialogTitle>
          <DialogDescription>
            Add city by filling in city details to get access to its weather.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center gap-7">
          <div className="grid gap-2">
            <Label htmlFor="city_name" className="mt-2">
              City Name
            </Label>
            <Input
              id="city_name"
              defaultValue=""
              className="mt-2"
              ref={city}
            />
          </div>
          <div className="grid gap-2 mt-4 mb-4">
            <Label htmlFor="country" className="mt-2 mb-2">
              Country Name
            </Label>
            <Input
              id="country"
              className="mt-2"
              ref={country}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleClick}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
