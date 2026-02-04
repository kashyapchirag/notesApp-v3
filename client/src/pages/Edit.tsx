import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    const getData = async () =>{
        try{
            const note = await axios.get(`/api/individual/${id}`)
            setTitle(note.data[0].title)
            setDetails(note.data[0].details)
        }catch{
            console.log("error while getting data in editing")
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const handleEdit = async() =>{
        try{
            await axios.post("/api/edit",{
                id,title,details
            })
            navigate("/")
        }catch{
            console.log("caught an error while editing")
        }
    }

    return (
        <div className="cont bg-black w-screen h-screen py-12 px-20">

            <div className="flex flex-col gap-4 justify-center h-[35%] ">

            <input
                onChange={(e) => {
                setTitle(e.target.value);
                }}
                value={title}
                className="bg-[#2B2B2E] text-white rounded-md w-full h-10 p-5"
                type="text"
            />

            <textarea
                onChange={(e) => {
                setDetails(e.target.value);
                }}
                value={details}
                className="bg-[#2B2B2E] text-white rounded-md min-h-36 resize-none w-full px-5 py-3"
                name="details"
                id="details"
            ></textarea>

            <button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 py-[0.2rem] rounded-md cursor-pointer w-16 text-zinc-200">
                Save
            </button>
            </div>
        </div>
    )
}

export default Edit
