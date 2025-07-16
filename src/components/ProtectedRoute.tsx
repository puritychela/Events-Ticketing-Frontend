import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"
import type { RootState } from "../app/store"

type ProtectedRouteProps={
    children: ReactNode,
    adminOnly?: boolean;
}

export default function ProtectedRoute({children}:ProtectedRouteProps) {

    const {isAuthenticated} = useSelector((state:RootState)=>state.auth)

    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }

    return <>{children}</>    
  
}

