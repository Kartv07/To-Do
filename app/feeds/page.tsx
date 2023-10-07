"use client"
import Image from 'next/image'
import Navbar from "../../Components/Navbar"
import Feedback from '@/Components/Feedback'
import {useRouter} from "next/navigation"
import Axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { AppContext } from "@/app/layout";


function Feeds() {

  const router = useRouter();
  const {user, setUser} = useContext(AppContext) || {user : true, setUser : () => undefined};
  const [data, setData] = useState<any>([]);

  const getDetails = async () => {
    const response = await Axios.get("/api/get", {params : {user : user}});
    setData(response.data.response);
  }

  useEffect(()=>{
    getDetails();
  },[])

  return (
    <div className='max-w-4xl mx-auto'>
      <Navbar />
      {data.length === 0 ? (<>
        <div className='text-xl mx-[20rem] flex my-24 items-center'>
          You Don't have any feeds !
        </div>
      </>) : (<>
      {data.map((val:any) => <Feedback id={val._id} title={val.title} description={val.description}/>)}
        
      </>)}
    </div>
  )
}