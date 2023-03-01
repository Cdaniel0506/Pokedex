import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './layout/Header'

const ProtectedRoutes = () => {

    const nameTrainer = useSelector(store => store.nameTrainer)

    if (nameTrainer) {
        return (
            <>

                <Header />
                <Outlet />
            </>
        )
    } else {
        return <Navigate to="/" />
    }

    /*El Outles renderiza o ver el hijo de una ruta padre, haces las veces de lo que se esta renderizando*/

}

export default ProtectedRoutes