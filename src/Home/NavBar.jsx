import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()
    const [logout,setLogout]=useState(true)

    useEffect(() => {
        // console.log(localStorage.getItem('access_token'))
        localStorage.getItem('access_token')?
            setLogout(true) : setLogout(false)
        
    },[])

   const handleChangeLogin = () => {
        try{
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            setLogout(false)
        }
        catch(e){
            console.log(e)
            setLogout(true)
        }
        if(!logout){
            navigate('/login')
        }
   }

    return (
        <div className="ms-sm-5 me-3 ms-3 me-sm-5">
            <div className="d-flex pt-3 justify-content-between">
                <div style={{cursor:'pointer'}} className="" onClick={()=>navigate('/')}>
                <h2 >Movie</h2>
                <h1 className="fs-4">Recomendation</h1>
                </div>
                
                
                <div className="d-flex overflow-hidden gap-3">
                    <div className="d-flex gap-2 align-items-center justify-content-between">
                        {/* {
                            Watchlist?
                            <i class="fa-solid fa-plus"></i>:
                            <i class="fa-solid mb-3 fa-check"></i>
                        } */}
                        <h5 onClick={()=>navigate('/watchlist')} style={{cursor:'pointer'}} className="mt-1">Watchlist</h5>
                    </div>
                    <div className="d-flex align-items-center">
                        <button onClick={()=>handleChangeLogin()} className="btn btn-light fw-bold  shadow-lg">
                            {logout?'Log out':'Sign In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar