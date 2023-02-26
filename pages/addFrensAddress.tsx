import React from 'react'
import type { RootState } from '../store/store'
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { ClusterEnvironment, IUser, MirrorWorld } from "@mirrorworld/web3.js"

import  {useRouter}  from 'next/router';
import { Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

function AddFrensAddress() {

    const user = useSelector((state: RootState) => state?.user);
    const router = useRouter();

    async function save(){
        console.log("save")
    }

    const recipientAddress = "7icXZr9isqt63QNmotLmSmvaq1iHM6YNswRos8ATwTQh"
    const amount = 1000000000 // Amount * Decimals
    const mirrorWorld = new MirrorWorld({
        apiKey: "mw_EQhbJbLVBaIwuQiXjemZhmIAJGqgFnWRIkI",
        env: ClusterEnvironment.testnet,
    })

    async function transfer(){
        console.log("Transfer")
        const transactionResult = await mirrorWorld.transferSOL({
            recipientAddress,
            amount,
        })
        console.log(transactionResult)
        
        return transactionResult;
    }

    return (
        <div className='p-6 shadow-xl'>
            <div className='flex items-center space-x-4 p-4 w-full' >
                <ArrowBackIcon className='text-gray-500' onClick={() => router.back()} />
                <span className='text-3xl font-bold'>Add Frens Address</span>
            </div>
            <div className='my-6'>
                <h1 className='text-lg mb-2'>My Frens Account Information</h1>
            </div>
            <Divider variant="middle" />
            <div className='flex flex-col'>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Solana Wallet Address</InputLabel>
                    <OutlinedInput 
                        id="outlined-adornment-password"
                        className='text-black'
                        type="text"
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                >
                                    <QrCodeIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Solana Wallet Address"
                    />
                </FormControl>
                <button onClick={save} className='shadow-xl font-semibold text-lg rounded-lg py-5 px-12'>Update Address</button>
                <button onClick={transfer} className='shadow-xl font-semibold text-lg rounded-lg py-5 px-12'>Transfer</button>
            </div>

        </div>

    )
}

export default AddFrensAddress