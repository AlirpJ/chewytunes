import React from 'react'
import useAuth from './useAuth'

export default function Dashboard({access_token}) {

    //const accessToken = useAuth(code)
    //console.log("Access Token:" + accessToken)

    const accessToken = access_token
    console.log("Access Token: "+accessToken)

    return (
        <div>
            This is a dashboard. You logged in with spotify! Access Token: 
            {access_token}
        </div>
    )
}