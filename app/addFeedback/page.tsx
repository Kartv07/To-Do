"use client"
import { AiFillFacebook } from "react-icons/ai"
import { useState, useContext } from "react";
import Navbar from "@/Components/Navbar";
import Axios from "axios";
import {toast, Toaster} from "react-hot-toast"
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/layout";

const AddFeedback = () =>{
    const {user, setUser} = useContext(AppContext) || {user : true, setUser : () => undefined};

    const [tit, setTit] = useState();
    const [descrip, setDescrip] = useState();
    const router = useRouter();
    const handleAdd = async () =>{
        const obj = {
            user : user,
            title : tit,
            description : descrip
        }
       const response = await Axios.post("/api/add", obj);
       if(response.data.status === 200){
       toast.success("List added successfully !");
       router.push("/feeds");
    }
        if(response.data.status === 202){
            toast.error("Feeds Title Already Exist !");
        }

    }
    return (
        <div className="max-w-4xl mx-auto">
            <Navbar />
            <div className="items-center justify-center flex flex-col py-4 bg-slate-100 shadow-lg border-slate-300 border-2 rounded-lg m-4 mx-w-4xl">
                <Toaster position="top-center" reverseOrder={false} />
                <input onChange={(e:any)=>{setTit(e.target.value)}} className="border-2 border-neutral-400 bg-transparent rounded-md px-4 py-2 mx-auto md:w-[700px]" placeholder="Title" value={tit}/>
                <input onChange={(e:any)=>setDescrip(e.target.value)} className="border-2 border-neutral-400 bg-transparent rounded-md px-4 py-2 my-2 md:w-[700px]" placeholder="Description" value={descrip} />
                <button onClick={handleAdd} className="bg-teal-400 rounded-lg px-4 py-2 hover:bg-teal-300" >Add</button>
            </div>
        </div>
    )
}

export default AddFeedback;