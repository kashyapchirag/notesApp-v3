import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const Note = () => {

    const [details, setDetails] = useState([])

    const { id } = useParams()

    const getData = async () =>{
        try{
            const details = await axios.get(`/api/individual/${id}`)
            setDetails(details.data)
        }catch{
            console.log("error while getting data")
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="cont bg-black text-white w-screen h-screen p-6">

            <NavLink to={'/'} className="text-blue-500 text-2xl hover:text-blue-600">
                Go back to home
            </NavLink>

            <div className="cont mt-4">
                {
                    details.map((ele,index)=>{
                        return (
                            <div key={ele._id} >
                                <div className='text-5xl text-red-300'>{ele.title}</div>
                                <div className='text-xl'>{ele.details}</div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Note
