"use client";
import back from "../assets/back.png"
import { useState, useEffect, useContext } from "react"
import GoogleButton from 'react-google-button'
import { gapi } from 'gapi-script';
import { AiOutlineMenu } from "react-icons/ai"
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { AppContext } from "@/app/layout";
import { useMediaQuery } from '@mui/material';
export default function Navbar() {
    const {log, setLog} = useContext(AppContext) || {log : true, setLog : () => undefined};
    const [toggle, setToggle] = useState<boolean>(false);
    const router = useRouter();
  const isDesktop = useMediaQuery('(max-width: 767px)');

    useEffect(() => {
        // Initialize the gapi object
        gapi.load('auth2', function () {
          gapi.auth2.init({
            client_id: '473394420689-3adj9t1ldud5c5p654f9dn5t3p7fuhc9.apps.googleusercontent.com',
          });
        });
      }, []);
    
      const handleSignOut = () => {
        console.log("hitting");

        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log("signedOut");
          router.push("/");
          setLog(true);

          // Perform any additional actions you need after signing out.
        });
      }
    
      const handleSignIn = () => {
        const auth2 = gapi.auth2.getAuthInstance();
    
        auth2.signIn().then((googleUser:any) => {
          const profile = googleUser.getBasicProfile();
          setLog(false);
          router.push("/feeds");
        });
      }
    return (
        <div className="max-w-4xl rounded-lg md:mx-auto">
            <div className="bgImg flex justify-between py-2 px-3 ">
                <div className=" font-normal">
                    <h3>Twiss</h3>
                    <p>Todo App</p>
                </div>
                {!isDesktop ? (<>
              
                    <div className="flex gap-8 py-2 items-center ">
                        <Link href="/feeds" className="hover:bg-teal-300 rounded-lg px-2 py-1">Feeds</Link>
                      {log === true ? (<><button onClick={handleSignIn} className=" rounded-lg text-white"><GoogleButton /></button></>) : (<>
                      <button onClick={handleSignOut} className="hover:bg-indigo-400 rounded-lg px-2 py-1 bg-indigo-500 text-white">Logout</button></>)}  
                    </div>
                 </>) : (<>

                    <button onClick={() => { setToggle(!toggle) }} className="border-[3px] hover:bg-teal-300 px-2 rounded-lg py-2 border-black" ><AiOutlineMenu size={20} /></button>
                    {toggle && <div className="flex flex-col absolute top-16 left-0 right-0 gap-4 bg-green-100 w-full px-4 py-2 h-screen mx-32 rounded-lg">
                        <Link href="/feeds" className="hover:bg-teal-300 rounded-lg px-2 py-1">Feeds</Link>
                        {log === true ? (<><button onClick={()=>{handleSignIn}} className=" rounded-lg text-white"><GoogleButton /></button></>) : (<><button onClick={()=>{handleSignOut}} className="hover:bg-indigo-400 rounded-lg px-2 py-1 bg-indigo-500 text-white">Logout</button></>)} 
                    </div>
                    }
                </>)}

            </div>
            <div className='bg-slate-500 flex justify-between'>
                <button onClick={() => { router.push("/addFeedback") }} className='bg-teal-200 py-2 px-2 my-2 rounded-lg mx-2'>Add List</button>
            </div>
        </div>
    )
}