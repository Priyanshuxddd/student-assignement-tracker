interface Assignment {
  id: number
  title: string
  description: string | null
  dueDate: string
  completed: boolean
}

interface AssignmentCardProps {
  assignment: Assignment
  onDelete: (id: number) => void
  onEdit: (assignment: Assignment) => void
}

const AssignmentCard = ({ assignment, onDelete, onEdit }: AssignmentCardProps) => {
  return <div className="card">
    <h2>{assignment.title}</h2>
    <p>{assignment.description}</p>
    <p>{new Date(assignment.dueDate).toLocaleDateString()}</p>
    <span className={`status ${assignment.completed ? "completed" : ""}`}>{assignment.completed ? "Completed" : "Pending"}</span>
    <div className="actions">
      <button className="edit-button" onClick={() => onEdit(assignment)}>Edit</button>
      <button className="delete-button" onClick={() => onDelete(assignment.id)}>Delete</button>
    </div>
  </div>
}

export default AssignmentCard
