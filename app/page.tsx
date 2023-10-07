"use client";
import { useEffect, useState, useContext } from "react";
import GoogleButton from "react-google-button";
import { gapi } from "gapi-script";
import login from "@/assets/login.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/layout";
function App() {
  const router = useRouter();
  const {log, setLog} = useContext(AppContext) || {log : true, setLog : () => undefined};
  const {user, setUser} = useContext(AppContext) || {user : true, setUser : () => undefined};

  useEffect(() => {
    // Initialize the gapi object
    gapi.load("auth2", function () {
      gapi.auth2.init({
        client_id:
          "473394420689-3adj9t1ldud5c5p654f9dn5t3p7fuhc9.apps.googleusercontent.com",
      });
    });
  }, []);

  function handleSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      router.push("/");
      // Perform any additional actions you need after signing out.
    });
  }

  const handleSignIn = () => {
    const auth2 = gapi.auth2.getAuthInstance();

    auth2.signIn().then((googleUser: any) => {
      const profile = googleUser.getBasicProfile();
      setLog(false);
      setUser(profile.cu);
      console.log(profile.cu);
      router.push("/feeds");
    });
  };

  return (
    <>
      <h1 className="text-4xl text-center rounded-lg mx-80 mt-32 w-auto h-auto text-white py-2 bg-blue-400 my-4 font-serif">
        To Do List 
      </h1>
      <div className="flex-auto grid grid-cols-2 my-6 border-4 border-blue-600 mx-80 ">
        <Image
          src={login}
          alt="login"
          className="flex justify-center items-center my-10"
        />

        <div className="border-4 border-blue-600 rounded-xl px-3 py-2 h-auto m-10 items-center ">
      
            <p className="flex justify-center my-24 h-auto items-center ">
              <GoogleButton onClick={handleSignIn} />
            </p>
       
        </div>
      </div>
    </>
  );
}

export default App;
