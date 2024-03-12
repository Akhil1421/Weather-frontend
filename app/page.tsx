'use client'
import {useState, useEffect} from 'react'
import NavBar from "./components/navbar";
import AskForLogIn from "./components/askForLogIn";
import CityData from './components/cities_data';

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);
  return (
    <main className="h-screen flex flex-col">
          <NavBar token={token}/>
          {token ? <CityData/>: <AskForLogIn/>}
    </main>
  );
}
