import Link from "next/link"

const AskForLogIn = () => {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-10">
        <p className="text-center font-bold text-xl">Create a session now to have access to weather of personalized locations</p>
        <Link href="/create_session"className="bg-black text-white px-6 py-3 mt-4 rounded-md hover:bg-gray-800 hover:text-gray-200 focus:outline-none focus:bg-gray-800 focus:text-gray-200">
                Create Session
        </Link>
      </div>
    );
}

export default AskForLogIn;
