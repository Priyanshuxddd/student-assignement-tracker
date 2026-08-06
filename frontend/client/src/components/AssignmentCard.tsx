interface Assignment {
    id: number;
    title: string;
    description: string | null;
    dueDate: string;
    completed: boolean;
  }
  
  interface AssignmentCardProps {
    assignment: Assignment;
  }



  const AssignmentCard  = ( {assignment } : AssignmentCardProps) => {

    console.log(assignment);
    
    return (

<div className="card">
    
    <h2>{assignment.title}</h2>

    <p>{assignment.description}</p>

    <p>{new Date(assignment.dueDate).toLocaleDateString()}</p>

    <span className="status">{assignment.completed ? "Completed" : "Pending"}</span>

    <div className="actions">
        <button style={{color:"yellow"}}>Edit</button>
        <button style={{color:"red"}}>Delete</button>
    </div>

    </div>

    )
}

export default AssignmentCard;