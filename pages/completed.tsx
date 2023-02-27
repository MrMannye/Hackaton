import NavBar from '@/components/NavBar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useMirrorWorld } from '@/hooks/useMirrorWorld';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface Tasks {
  friend_publickey: string,
  task_date: Date,
  task_desc: string,
  task_name: string,
  task_state: number,
  user_publickey: string,
}


function Completed() {

  const { user, mirrorworld } = useMirrorWorld()
  const router = useRouter();

  const [tasks, setTasks] = useState<Tasks[]>([])
  const user_publickey = useSelector((state: RootState) => state.user?.wallet?.sol_address);
  
  var amount = 0;
  const [text, setText] = useState("******");
  
  function changeText() {
      setText(amount.toString());
  }

  const gettokens = async () => {
      if (!mirrorworld) throw new Error("Mirror World SDK is not initialized")
      await mirrorworld.getTokens().then((tokens) => {
          amount = tokens["sol"];
          console.log(amount); 
      })
      .catch((error) => {
          console.error(error);
          alert('No se obtuvieron los tokens');
      });

      changeText();
  }

  useEffect(() => {
    if (user === undefined) router.push("/");
  },[])
  
  useEffect(() => {
    fetch("https://proactive-node.herokuapp.com/completedTasks/" + user_publickey)
      .then(response => response.json())
      .then(data => setTasks(data));
  }, [])

  return (
    <div className='h-screen relative w-screen'>
      <h1 className=' text-4xl p-4 py-5 text-white font-bold bg-[#FC7823]'>Completed Tasks</h1>
      <p className=' text-1xl pl-4 pb-2 pt-2 text-white font-medium bg-[#545454]'> 
        <button onClick={() => gettokens()}>
          <RemoveRedEyeIcon/>
        </button> 
          <span>  My $SOL Balance:   <span>{text}</span></span>
      </p>
      <div className='p-3'>
        <h2>Completed Tasks</h2>
        {tasks.map((task, index) => {
          return (
              <div key={index} className="flex items-center justify-between p-4 border mb-3 shadow-xl">
                <div className='flex flex-col items-start'>
                  <span className='text-2xl font-bold'>{task.task_name}</span>
                  <span>{task.task_desc}</span>
                </div>
                <div>
                  <input type="checkbox" className='custom-checkbox custom-control-label' />
                </div>
              </div>
          )
        })}
      </div>
      <NavBar />
    </div>
  )
}

export default Completed