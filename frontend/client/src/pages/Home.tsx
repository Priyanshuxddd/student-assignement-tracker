import axios from "axios"
import { useEffect, useState } from "react"
import api from "../services/api"
import AssignmentCard from "../components/AssignmentCard" 
import "./Home.css"

interface Assignment {

    id   : number
  title   : string
  description : string | null
  dueDate    : string
  completed   : boolean
   
}

function Home(){

const [assignments, setAssignments] = useState<Assignment []>([])
const [isLoading, setIsLoading] = useState(true)
const [fetchError, setFetchError] = useState("")

const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
const [dueDate, setDueDate] = useState("")

const [showForm, setShowForm] = useState(false)

async function fetchAssignments(){
    try {
        setIsLoading(true)
        setFetchError("")
        const response =  await api.get("/assignments")
        setAssignments(response.data.assignments)
    } catch (error) {
        console.error("Could not fetch assignments", error)
        setFetchError(
            axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : "Could not load assignments. Please check that the server is running and try again."
        )
    } finally {
        setIsLoading(false)
    }
   
}
useEffect(()=> {
    fetchAssignments()
},[]);


async function handleDelete(id: number) {
    try {
        await api.delete(`/assignments/${id}`)
        setAssignments((current) => current.filter((assignment) => assignment.id !== id))
    } catch (error) {
        console.log(error)
    }
}

return <div>
    
<main className="homeTop">

    <h1>STUDENT ASSIGNMENT TRACKER</h1>

    <p>All Your Assignment Gathered In One Place</p>

    <button className="button" onClick={()=> setShowForm(true)}>Add Assignment</button>
    {isLoading && <p>Loading assignments…</p>}
    {fetchError && (
        <div role="alert">
            <p>{fetchError}</p>
            <button onClick={fetchAssignments}>Try again</button>
        </div>
    )}
    {showForm && (
    <div>
        <h2>Add Assignment</h2>

        <input
            type="text"
            placeholder="Assignment title"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
        />

        <textarea
            placeholder="Description"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
        />

        <input
            type="date"
            value={dueDate}
            onChange={(e)=> setDueDate(e.target.value)}
        />

        <button onClick={handleSubmit}>Create Assignment</button>

        <button onClick={() => setShowForm(false)}>
            Close
        </button>
    </div>
)}
            {assignments.map((assignment) => (
                <AssignmentCard 
                    key = {assignment.id}
                assignment = {assignment}
                onDelete = {handleDelete}
                
            />
        ))}


        

</main>
</div>

async function handleSubmit(){
    try{
       const response =  await api.post("/assignments",{
        title:title,
        description: description,
        dueDate: dueDate,
        userId: 1
       })
       console.log(response);

       setAssignments([
        ...assignments,
        response.data.assignment
    ])
       
    }  catch (error){
            console.log(error);
            
    }
}

}

async function handleEdit(){

}


export default Home;
