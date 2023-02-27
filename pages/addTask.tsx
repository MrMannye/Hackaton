import { Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useMirrorWorld } from '@/hooks/useMirrorWorld';

function AddTask() {

    const { user } = useMirrorWorld()
    const router = useRouter();

    useEffect(() => {
        if (user === undefined) router.push("/");
    }, [])

    const user_publickey = useSelector((state: RootState) => state?.user.wallet?.sol_address);

    const [nameActivity, setNameActivity] = useState("");
    const [description, setDescription] = useState("");

    const addTask = () => {
        axios.post("https://proactive-node.herokuapp.com/addTask", {
            user_publickey: user_publickey,
            task_name: nameActivity,
            task_desc: description,
            task_state: 0,
        }).then(response => {
            console.log(response.data);
            router.push("/mytasks");
        })
    }

    const handleChangeName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNameActivity(e.target.value);
    }
    
    const handleChangeDescription = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(e.target.value);
    }

    return (
        <div className='p-6'>
            <div className='flex justify-between'>
                <ArrowBackIcon className='text-gray-500' onClick={() => router.back()} />
                <EditIcon className='text-gray-500' />
            </div>
            <div className='my-6'>
                <h1 className='text-2xl mb-2 font-bold'>Name Activity</h1>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-activity">Name Activity</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-activity"
                        className='text-black'
                        type="text"
                        onChange={handleChangeName}
                        value={nameActivity}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                >
                                    <PersonIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Name Activity"
                    />
                </FormControl>
                <h1 className='text-2xl mb-2 font-bold'>Description</h1>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <TextField
                        id="z"
                        label="Description"
                        multiline
                        onChange={handleChangeDescription}
                        value={description}
                        rows={4}
                    />
                </FormControl>
            </div>
            <Divider variant="middle" />
            <div className='flex flex-col'>
                <button onClick={() => addTask()} className='py-4 w-80 shadow-xl self-center bg-[#FC7823] rounded-lg text-white font-semibold mt-5'>Add Task</button>
            </div>
        </div>
    )
}

export default AddTask