"use client"
import Navbar from '../../components/navbar';
import LoadingSpinner from '../../components/loading';
import { useEffect, useState } from 'react';
import { BACKEND_BASE_URL } from '@/app/context/context';
import axios from 'axios';
import {UserOptions} from "../../components/user_options"
import EditCity from "../../components/edit_city"
import {DeleteCity} from "../../components/delete_city"

const City = ({params}) => {
  const [showLoading, setShowLoading] = useState(true)
  const [token, setToken] = useState("");
  const [cityData, setCityData] = useState({})
  const [isCityDataChanged, setIsCityDataChanged] = useState(false)
  const {id} = params
  const fetchData = async()=>{
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/weather/city/${id}`,{
            headers:{
                'token': localStorage.getItem('token')
            }
        })
        setCityData(response.data.data)
        setShowLoading(false)
    } catch (error) {
        console.log(error)
        setShowLoading(false)
        if(error.response){
            if(error.response.status===403){
                alert("Create a session first")
            }
            else if(error.response.status===400){
              alert("Incorrect URL. Please retype URL if you manually typed it else close the page.")
            }
            else{
              alert("Something went wrong") 
            }
        }
        else alert("Service currently unreachable")
    }
  }
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
    fetchData()
  }, [isCityDataChanged]);
  const [isEditModelOpen, setEditModelOpen] = useState(false)
  const [isDeleteModelOpen, setDeleteModelOpen] = useState(false)
  return (
    <>
      <Navbar token={token}/>
      {showLoading && <LoadingSpinner/>}
      {(cityData.name!==undefined) && <div className='flex flex-col justify-center p-6'>
          <div className='flex justify-between'>
            <span className='text-2xl font-bold'>
              {cityData?.name}
              <img src={cityData.icon} alt="Weather Icon"/>
            </span>
            <UserOptions setEditModelOpen={setEditModelOpen} setDeleteModelOpen={setDeleteModelOpen}/>
          </div>
          <div className='flex flex-col gap-4 justify-center items-center data-width'>
            <div className='flex text-2xl justify-between w-full'>
              <span>Country: </span><b>{cityData.country}</b>
            </div>
            <div className='flex text-2xl justify-between w-full'>
              <span>Condition: </span><b>{cityData.condition}</b>
            </div>
            <div className='flex text-2xl justify-between w-full'>
              <span>Temp: </span><b>{cityData.temperature}&deg;C</b>
            </div>
            <div className='flex text-2xl justify-between w-full'>
              <span>Humidity: </span><b>{cityData.humidity}%</b>
            </div>
          </div>
        </div>
      }
      {isEditModelOpen && <EditCity isModelOpen={isEditModelOpen} 
        setIsLoading={setShowLoading} setIsCityDataChanged={setIsCityDataChanged}
        setIsModelOpen={setEditModelOpen} defaultCityName = {cityData.name} id={params.id}/>}
      
      {isDeleteModelOpen && <DeleteCity isModelOpen={isDeleteModelOpen} id={params.id}
      setIsLoading={setShowLoading} setIsModelOpen={setDeleteModelOpen}/>}
    </>
  );
}

export default City;
