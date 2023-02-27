import React, { useEffect, useState } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import axios from 'axios';

interface Tasks {
    friend_publickey: string,
    task_date: Date,
    task_desc: string,
    task_name: string,
    task_state: number,
    user_publickey: string,
  }

export default function Task() {
  
    const router = useRouter();
    const task_name = router.query.id;
    const [task, setTask] = useState<Tasks>()
    const user_publickey = useSelector((state: RootState) => state?.user.wallet?.sol_address)

    useEffect(() => {
        fetch("https://proactive-node.herokuapp.com/tasks/"+user_publickey+"/"+task_name)
          .then(response => response.json())
          .then(data => setTask(data[0]));
      },[])
    
      const completeTask = () => {
        axios.post("https://proactive-node.herokuapp.com/completeTask",{
            user_publickey: user_publickey,
            task_name: task_name,
        }).then(response => {
            console.log(response.data);
            router.push("/mytasks")
        }) 
      }

    return (
    <div className='p-6'>
        <div className='flex justify-between'>
            <ArrowBackIcon className='text-gray-500' onClick={() => router.back()}/>
            <EditIcon className='text-gray-500'/>
        </div>
        <div className='my-6'>
            <h1 className='text-4xl mb-2 font-bold'>{task_name}</h1>
            <span>{task?.task_desc}</span>
        </div>
        <Divider variant="middle" />
        <div className='flex flex-col'>
            <h2>{task?.task_date.toString()}</h2>
            <span className='text-2xl mb-2 font-bold'>{task?.user_publickey?.slice(0,10)}... <span className='text-[#545454]'>{[task_name]}</span></span>
            <button onClick={() => completeTask()} className='py-4 w-80 shadow-xl self-center bg-[#FC7823] rounded-lg text-white font-semibold mt-5'>Mark As Complete</button>
        </div>
    </div>
  )
}
