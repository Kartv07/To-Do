"use client"
import { useState } from "react";
import Navbar from "@/Components/Navbar";
import Axios from "axios";
import {toast, Toaster} from "react-hot-toast"
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
const EditFeedback = (params:any) =>{
    const id_val = params.params.id;
    const [tit, setTit] =useState<string>();
    const [descrip, setDescrip] = useState<string>();
    const router = useRouter();

    const get = async () => {
        const response = await Axios.get("/api/getById", {params : {id : id_val}});
        setTit(response.data.response.title);
        setDescrip(response.data.response.description);
    }

    useEffect(()=>{
        get();
    }, [])

    const handleUpdate = async () => {
        const obj = {
            id : id_val,
            title : tit,
            description : descrip
        }
        const response = await Axios.put("/api/update", obj);
        toast.success("Updated Successfully !");
        router.push("/feeds");
    }
    return (
        <div className="max-w-4xl mx-auto">
            <Navbar />
            <div className="items-center justify-center flex flex-col py-4 bg-slate-100 shadow-lg border-slate-300 border-2 rounded-lg m-4 mx-w-4xl">
                <Toaster position="top-center" reverseOrder={false} />
                <input onChange={(e:any)=>{setTit(e.target.value)}} className="border-2 border-neutral-400 bg-transparent rounded-md px-4 py-2 mx-auto md:w-[700px]" placeholder="Title" value={tit}/>
                <input onChange={(e:any)=>setDescrip(e.target.value)} className="border-2 border-neutral-400 bg-transparent rounded-md px-4 py-2 my-2 md:w-[700px]" placeholder="Description" value={descrip} />
                <button onClick={handleUpdate} className="bg-teal-400 rounded-lg px-4 py-2 hover:bg-teal-300" >Update</button>
            </div>
        </div>
    )
}

export default EditFeedback;