import { FaUser } from "react-icons/fa"

const Navbar: React.FC<{ token: string | null }> = ({ token })=> {
  return (
    <nav className="flex justify-between items-center bg-black text-white p-5">
        <h1 className="font-bold mx-auto text-2xl">Weather App</h1>
        {/* {token!==null && <FaUser className="text-white cursor-pointer" />} */}
    </nav>
  )
}

export default Navbar
