import { Breadcrumbs, Skeleton, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function UpdatePageLoader() {
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" className='mb-3'>
                <Link to='/' underline="hover" color="inherit" href="/">
                    Home
                </Link>
                <Link to='/vehicles' underline="hover" color="inherit" href="/">
                    Vehicles
                </Link>
                <Typography >Update Vehicle</Typography>
            </Breadcrumbs>
            <div className='d-flex gap-4 w-100'>
                <div className='section w-100'>
                    <Skeleton variant='rounded' height={250} />
                </div>
                <div className='section w-100 d-flex flex-column gap-3'>
                    <Skeleton variant='rounded' height={40} />
                    <Skeleton variant='rounded' height={40} />
                    <Skeleton variant='rounded' height={40} />
                    <Skeleton variant='rounded' height={40} />
                    <Skeleton variant='rounded' height={40} />
                </div>
                <div className='section w-100 d-flex flex-column gap-3'>
                    <Skeleton variant='rounded' height={40} />
                    <Skeleton variant='rounded' height={40} />
                    <Skeleton variant='rounded' height={40} />
                    <Skeleton variant='rounded' height={40} />
                    <Skeleton variant='rounded' height={40} />
                </div>
            </div>
            <div className='section d-flex flex-column gap-3'>
                <div className='d-flex gap-3'>
                    <Skeleton variant='rounded' height={40} style={{ width: "100%" }} />
                    <div height={40} style={{ width: "100%" }} />
                    <div height={40} style={{ width: "100%" }} />
                </div>
                <div className='d-flex gap-3'>
                    <Skeleton variant='rounded' height={40} style={{ width: "100%" }} />
                    <Skeleton variant='rounded' height={40} style={{ width: "100%" }} />
                    <Skeleton variant='rounded' height={40} style={{ width: "100%" }} />
                </div>
            </div>
            <div className='section d-flex flex-column gap-3'>
                <div className='d-flex gap-3'>
                    <Skeleton variant='rounded' height={40} style={{ width: "100%" }} />
                    <Skeleton variant='rounded' height={40} style={{ width: "100%" }} />
                    <Skeleton variant='rounded' height={40} style={{ width: "100%" }} />
                </div>
                <div className='d-flex gap-3'>
                    <Skeleton variant='rounded' height={40} style={{ width: "100%" }} />
                    <Skeleton variant='rounded' height={40} style={{ width: "100%" }} />
                    <Skeleton variant='rounded' height={40} style={{ width: "100%" }} />
                </div>
                <div className='d-flex gap-3'>
                    <Skeleton variant='rounded' height={40} style={{ width: "100%" }} />
                    <Skeleton variant='rounded' height={40} style={{ width: "100%" }} />
                    <Skeleton variant='rounded' height={40} style={{ width: "100%" }} />
                </div>
            </div>
        </div>
    )
}

export default UpdatePageLoader