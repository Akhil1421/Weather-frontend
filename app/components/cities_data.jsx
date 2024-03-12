'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../context/context";
import AddCity from "./add_city"
import LoadingSpinner from "./loading";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';


const CityData = ()=>{
    const [cityData, setCityData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [cityDataChange, setIsCityDataChanged] = useState(true)
    const router = useRouter();

    const fetchData = async()=>{
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}/weather`,{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })
            setCityData(response.data.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            if(error.response){
                if(error.response.data.status===403){
                    alert("Create a session first")
                }
            }
            else alert("Service currently unreachable")
        }
    }
    useEffect(()=>{
        fetchData()
    },[cityDataChange])
    const uiArray = cityData.map((city,index)=>{
        return(
            <div className="border border-solid rounded-lg p-4 cursor-pointer" 
            key={`city${index}`} 
            onClick={()=>{router.push(`/city/${city.id}`)}}
            style={{"marginLeft": "1rem", marginRight:"1rem", borderColor:"#000", borderRadius:"0.5rem", marginTop:"1rem"}}>
            <div className="flex items-center justify-center gap-4">
                <div className="flex justify-center" style={{minWidth:"50%"}}>
                    <img src={city.icon} className="mr-4" alt="Weather Icon"/>
                </div>
                <div className="flex flex-col gap-4">
                <span>City : <b>{city.name}</b></span>
                <span>Country: <b>{city.country}</b></span>
                <span><b>{city.condition}</b></span>
                <span>Temp: <b>{city.temperature}&deg;C</b></span>
                </div>
            </div>
            </div>
        )
    })
    const [isModelOpen, setIsModelOpen]  = useState(false)
    return (
        <div className="grid mt-10 mb-10">
            {isLoading && <LoadingSpinner/>}
            {uiArray.length < 4 && 
                <div className="add-button">
                    <Button onClick={()=>setIsModelOpen(true)}>Add City</Button>
                </div>
            }
            <div className="grid grid-cols-2 gap-4 grid-container">
                {uiArray}
            </div>
            {isModelOpen && <AddCity setIsLoading={setIsLoading} setIsCityDataChanged={setIsCityDataChanged}
            isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}/>}
        </div>
    )
}

export default CityData
