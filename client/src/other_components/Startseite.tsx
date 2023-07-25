import { LinkContainer } from "react-router-bootstrap"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../authentication/features/authSlice"
import Button from "react-bootstrap/Button"

export default function Startseite() {
  const authSlice = useAppSelector(selectAuth)
  const isAdmin = authSlice.isAdministrator
  return (
    <div
      id="StartPage"
      className="centered"
      style={{
        height: "85vh",
        flexDirection: "column",
      }}
    >
      <h1>Successfully logged in!</h1>
      <p>
        Berliner Hochschule für Technik (BHT) is one of Germany‘s largest state
        universities of applied sciences. With a wide range of forward-looking
        degree courses and a staff of highly qualified specialists, BHT
        encourages the career opportunities of all prospective and current
        students, regardless of their social background. BHT was founded in 1971
        as the Technische Fachhochschule Berlin (TFH) when several engineering
        academies were merged.
      </p>
      {isAdmin && (
        <LinkContainer to="/usermanagement">
          <Button id="OpenUserManagementPageButton">User Management</Button>
        </LinkContainer>
      )}
    </div>
  )
}
