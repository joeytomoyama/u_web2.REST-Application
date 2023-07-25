import { Modal, Spinner } from "react-bootstrap"
import { selectAuth } from "../authentication/features/authSlice"
import { useAppSelector } from "../app/hooks"

export default function SpinnerElement() {
  const authSlice: any = useAppSelector(selectAuth)
  const showSpinner = authSlice.body?.status === "loading"
  // const showSpinner = true

  // const componentStyle = {
  //   position: "absolute",
  //   display: showSpinner ? "block" : "none",
  //   zIndex: 1000000,
  //   backgroundColor: "red",
  // }

  return (
    <Modal
      show={showSpinner}
      id={"Spinner"}
      style={{
        zIndex: 1000000,
      }}
    >
      <Modal.Dialog>
        <Modal.Body>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  )
}
