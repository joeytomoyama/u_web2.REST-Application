export default function NotFound() {
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
        <h3>Sorry, we couldn't find the page you are looking for.</h3>
      </div>
    </div>
  )
}
