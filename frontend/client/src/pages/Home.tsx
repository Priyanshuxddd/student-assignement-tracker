import { useEffect, useState } from "react"
import api from "../services/api"

interface Assignment {

    id   : number
  title   : string
  description : string | null
  dueDate    : string
  completed   : boolean
   
}

function Home(){

const [assignments, setAssignments] = useState<Assignment[]>([])

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

        <h1>STUDENT ASSIGNMENT</h1>
    {assignments.map((assignment: Assignment) => (
        <div key={assignment.id}>
           
            <h2>{assignment.title}</h2>
            <h2>{assignment.description ?? "No Description"}</h2>
            <h2>{new Date(assignment.dueDate).toLocaleDateString()}</h2>
            <h2>{assignment.completed ? "Completed" : "Pending"}</h2>
        </div>
    ))}

   
</div>
}

export default Home;