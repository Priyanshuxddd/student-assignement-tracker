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

async function fetchAssignments(){

    try {
        const response =  await api.get("/assignments")
    setAssignments(response.data.assignments)
    } catch (error) {
        return console.log(error);
        
    }
   
}
useEffect(()=> {
    fetchAssignments()
},[]);

return <div>
    
<main className="homeTop">

    <h1>STUDENT ASSIGNMENT TRACKER</h1>

    <p>All Your Assignment Gathered In One Place</p>

    <button className="button">Add Assignment</button>

            {assignments.map((assignment) => (
                <AssignmentCard 
                    key = {assignment.id}
                assignment = {assignment}
            />
        ))}


</main>


   
</div>
}


export default Home;