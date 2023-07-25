export default function NotAllowed() {
  return (
    <div id="NotFound" className="centered middleBox">
      <div
        className="centered"
        style={{
          flexDirection: "column",
          borderRadius: "10px",
          backgroundColor: "grey",
          height: "20rem",
          width: "40rem",
          padding: "5rem",
          textAlign: "center",
        }}
      >
        <h3>Sorry, you are not allowed to be here.</h3>
      </div>
    </div>
  )
}
