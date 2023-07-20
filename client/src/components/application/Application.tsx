import { Button } from "react-bootstrap"
import { ApplicationType } from "../../types"

interface ApplicationProps {
  id: string
  application: ApplicationType
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>
  setClickedApplication: React.Dispatch<
    React.SetStateAction<ApplicationType | undefined>
  >
}

const editButtonText = "UserItemEditButton"
const deleteButtonText = "UserItemDeleteButton"

export default function Application({
  id,
  application,
  setShowEdit,
  setShowDelete,
  setClickedApplication,
}: ApplicationProps) {
  return (
    <div
      id={id}
      style={{
        width: "fit-content",
        borderRadius: "5px",
        backgroundColor: "grey",
        margin: "10px",
        padding: "10px",
      }}
    >
      <p>{application.status}</p>
      <p>{application.status}</p>
      <p>{application.status}</p>
      <Button
        id={editButtonText + application.id}
        onClick={() => {
          setClickedApplication(application)
          setShowEdit(true)
        }}
      >
        Edit Application
      </Button>
      <Button
        id={deleteButtonText + application.id}
        onClick={() => {
          setClickedApplication(application)
          setShowDelete(true)
        }}
      >
        Delete Application
      </Button>
    </div>
  )
}
