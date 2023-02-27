import React, { useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'
import { Fab } from '@mui/material'
import Link from 'next/link';

import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useMirrorWorld } from '@/hooks/useMirrorWorld';
import {useRouter} from 'next/router';

interface Tasks {
  friend_publickey: string,
  task_date: Date,
  task_desc: string,
  task_name: string,
  task_state: number,
  user_publickey: string,
}

function Mytaks() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const user_publickey = useSelector((state: RootState) => state.user?.wallet?.sol_address);
  const { user } = useMirrorWorld();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) router.push("/");
  }, [])
  useEffect(() => {
    fetch("https://proactive-node.herokuapp.com/tasks/" + user_publickey)
      .then(response => response.json())
      .then(data => setTasks(data));
  }, [])

  return (
    <div className='h-screen relative w-screen'>
      <h1 className=' text-4xl p-4 py-5 text-white font-bold bg-[#FC7823]'>MyTasks</h1>
      <div className='p-3'>
        <h2>Schedule tasks</h2>
        {tasks.map((task, index) => {
          return (
            <Link key={index} href={`/task/${task.task_name}`}>
              <div className="flex items-center justify-between p-4 border mb-3 shadow-xl">
                <div className='flex flex-col items-start'>
                  <span className='text-2xl font-bold'>{task?.task_name}</span>
                  <span>{task?.task_desc}</span>
                </div>
                <div>
                  <input type="checkbox" className='custom-checkbox custom-control-label' />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <Link href={"/addTask"} className='absolute right-6 bottom-28'>
        <Fab className='bg-[#FC7823]' size='large'>
          <AddIcon className='text-white' />
        </Fab>
      </Link>
      <NavBar />
    </div>
  )
}

export default Mytaks