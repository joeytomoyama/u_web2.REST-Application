import { Modal, Button } from "react-bootstrap"
import { selectAuth } from "../../authentication/features/authSlice"
import { ApplicationType } from "../../types"
import { useAppSelector } from "../../app/hooks"
import * as IDS from "../../ids"

interface DeleteApplicationModalProps {
  showDelete: boolean
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>
  applications: ApplicationType[]
  setApplications: React.Dispatch<React.SetStateAction<ApplicationType[]>>
  clickedApplication: ApplicationType | undefined
}

export default function DeleteApplicationModal({
  showDelete,
  setShowDelete,
  applications,
  setApplications,
  clickedApplication,
}: DeleteApplicationModalProps) {
  const authSlice = useAppSelector(selectAuth)

  const handleApplicationDelete = (e: any) => {
    e.preventDefault()
    fetch(
      import.meta.env.VITE_SERVER_URL +
        "degreeCourseApplications/" +
        clickedApplication?.id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + authSlice.token,
        },
      },
    ).then((response) => {
      if (response.status !== 204) return
      const newApplications = applications.filter(
        (u: ApplicationType) => u.id !== clickedApplication?.id,
      ) as ApplicationType[]
      setApplications(newApplications)
      setShowDelete(false)
    })
  }
  return (
    <Modal
      show={showDelete}
      id={IDS.DeleteDialogDegreeCourseApplication + clickedApplication?.id}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            {`Delete Application for ${clickedApplication?.degreeCourseID} by ${clickedApplication?.applicantUserID}?`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Soll Application für ${clickedApplication?.applicantUserID} gelöscht werden?`}</Modal.Body>
        <Modal.Footer>
          <Button
            id={IDS.DeleteDialogCancelButton}
            onClick={() => setShowDelete(false)}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            id={IDS.DeleteDialogConfirmButton}
            onClick={handleApplicationDelete}
            variant="primary"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}
