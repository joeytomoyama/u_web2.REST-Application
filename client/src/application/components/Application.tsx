import { Button, Card } from "react-bootstrap"
import { ApplicationType } from "../../types"
import * as IDS from "../../ids"

interface ApplicationProps {
  application: ApplicationType
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>
  setClickedApplication: React.Dispatch<
    React.SetStateAction<ApplicationType | undefined>
  >
}

export default function Application({
  application,
  setShowEdit,
  setShowDelete,
  setClickedApplication,
}: ApplicationProps) {
  return (
    <Card
      id={IDS.DegreeCourseApplicationItem + application.id}
      style={{
        width: "27rem",
        border: "0",
        margin: "10px",
      }}
    >
      <Card.Body>
        <Card.Title>{`${application.applicantUserID}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {application.degreeCourseID}
        </Card.Subtitle>
        <Card.Text>Applicant ID: {application.applicantUserID}</Card.Text>
        <Card.Text>Degree Course ID: {application.degreeCourseID}</Card.Text>
        <Card.Text>
          Target Period Year: {application.targetPeriodYear}
        </Card.Text>
        <Card.Text>
          Target Period Short Name: {application.targetPeriodShortName}
        </Card.Text>
        <Card.Text>ID: {application.id}</Card.Text>
        {/* <Button
          id={IDS.DegreeApplicationItemEditButton + application.id}
          onClick={() => {
            setClickedApplication(application)
            setShowEdit(true)
          }}
        >
          Edit Application
        </Button>
        <Button
          id={IDS.DegreeApplicationItemDeleteButton + application.id}
          onClick={() => {
            setClickedApplication(application)
            setShowDelete(true)
          }}
        >
          Delete Application
        </Button> */}
        {/* <Button
          id={
            IDS.CreateDegreeApplicationApplicationForDegreeApplication +
            application.id
          }
          onClick={() => {
            console.log("TODO")
          }}
        >
          Apply
        </Button> */}
      </Card.Body>
    </Card>
  )
}
