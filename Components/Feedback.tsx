
"use client"

import { LiaEdit } from 'react-icons/lia';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useState } from 'react'
import Link from 'next/link';
import Axios from 'axios';
import { useRouter } from 'next/navigation';

const Feedback = (props: any) => {
    const { title, description, id } = props;
    const router = useRouter();
    localStorage.setItem("id", props.id);

    const handleDelete = async () => {
        const obj: any = { id: props.id };
        let confirmed = confirm("Do you want to delete ?");
        if (confirmed) {
            const response = await Axios.delete("/api/delete", { params: { id: props.id } });
            router.push("/addFeedback");
        }
    }

    const handleEdit = () =>{
        router.push(`/editFeedback/${props.id}`) 
    }
    return (
        <div className='flex justify-between px-4 gap-5 py-2 mx-auto items-center my-4 h-24 shadow-lg border-2 border-slate-300 rounded-lg max-w-4xl '>
            <div>
                <div className='text-xl font-semibold'>{title}</div>
                <div className="text-sm">{description}</div>
            </div>
            <div className='items-start flex gap-4'>
                <RiDeleteBinLine size={24} onClick={handleDelete} className="text-red-500 hover:text-red-400 cursor-pointer" />

                <div onClick={handleEdit}>
                    <LiaEdit size={24} style={{cursor : "pointer"}} />
                </div>
            </div>
        </div>
    )
}

export default Feedback;