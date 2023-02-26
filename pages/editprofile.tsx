import React, { useEffect } from 'react'
import type { RootState } from '../store/store'
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { useRouter } from 'next/router';
import { Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

function Editprofile() {

    const user = useSelector((state: RootState) => state?.user);
    const router = useRouter();
    useEffect(() => {
        if (user === undefined) router.push("/");
    }, [])
    return (
        <div className='p-6 shadow-xl'>
            <div className='flex items-center space-x-4 p-4 w-full' >
                <ArrowBackIcon className='text-gray-500' onClick={() => router.back()} />
                <span className='text-3xl font-bold'>Edit Profile</span>
            </div>
            <div className='my-6'>
                <h1 className='text-lg mb-2'>My Account Information</h1>
            </div>
            <Divider variant="middle" />
            <div className='flex flex-col'>
                    <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Fecha de Registro</InputLabel>
                    <OutlinedInput disabled
                        id="outlined-adornment-password"
                        className='text-black'
                        type="text"
                        value={user.createdAt}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                >
                                    <CalendarMonthIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Fecha de Registro"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-correo">Username</InputLabel>
                    <OutlinedInput disabled
                        id="outlined-adornment-correo"
                        className='text-black'
                        type="text"
                        value={user.username}
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
                        label="Username"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Email Address</InputLabel>
                    <OutlinedInput disabled
                        id="outlined-adornment-password"
                        className='text-black'
                        type="text"
                        value={user.email}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                >
                                    <EmailOutlinedIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Email Address"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Solana Wallet Address</InputLabel>
                    <OutlinedInput disabled
                        id="outlined-adornment-password"
                        className='text-black'
                        type="text"
                        value={user.wallet?.sol_address}
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
            </div>

        </div>

    )
}

export default Editprofile