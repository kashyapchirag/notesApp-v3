import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Main() {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [notes, setNotes] = useState([])

    const display = async ()=>{
        const notes = await axios.get("/api/display")
        setNotes(notes.data)
    }

    useEffect(() =>  {
        display()
    },[])
    

    const handleCreate = async() =>{
        try{
            await axios.post("/api/create",{
                title,
                details
            })
            display()
        }catch{
            console.log("caught an error")
        }
        setTitle("")
        setDetails("")
    }

    const handleDelete = async(id :any) =>{
        try{
            await axios.post("/api/delete",{
                id
            })
            display()
        }catch{
            console.log("caught an error while deleting")
        }
    }
    

    return (
        <>
        <div className="cont bg-black w-screen h-screen py-12 px-20">

            <div className="flex flex-col gap-4 justify-center h-[35%] ">

            <input
                onChange={(e) => {
                setTitle(e.target.value);
                }}
                value={title}
                className="bg-[#2B2B2E] text-white rounded-md w-full h-10 p-5"
                type="text"
                placeholder="Title goes here"
            />

            <textarea
                onChange={(e) => {
                setDetails(e.target.value);
                }}
                value={details}
                className="bg-[#2B2B2E] text-white rounded-md min-h-36 resize-none w-full h- px-5 py-3"
                name="details"
                id="details"
                placeholder="Write your task details here"
            ></textarea>

            <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 py-[0.2rem] rounded-md cursor-pointer w-28 text-zinc-200">
                Create Task
            </button>
            </div>
                
            <div className="mt-15 text-white flex gap-4 flex-wrap justify-center items-center">

            {
                notes.map((note,index)=>{
                return(

                    <div key={index} className="card bg-zinc-700 min-h-28 min-w-40 rounded-md flex flex-col gap-3 p-2 items-center relative">
                        <div className="buttons flex gap-1 absolute top-1 right-1">
                            <NavLink to={`/note/edit/${note._id}`}><img className="w-[1.3rem] cursor-pointer" src="/edit.svg" alt="" /></NavLink>
                            <img onClick={()=>handleDelete(note._id)} className="w-[1rem] cursor-pointer" src="/delete.svg" alt="" />
                        </div>
                        <div className="title mt-3 text-3xl text-center">
                            {note.title}
                        </div>
                        <NavLink to={`/note/${note._id}`} className="text-blue-500 hover:text-blue-600">
                            Read more...
                        </NavLink>
                    </div>
                )
                })

            }
            </div>

        </div>
        </>
    );
}

export default Main;
