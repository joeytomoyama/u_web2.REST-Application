export default function Banner() {
  return (
    <div
      id="Banner"
      style={{
        height: "20rem",
        width: "100%",
        backgroundColor: "red",
      }}
    >
      <img
        src="../../../public/banner.jpg"
        alt="Banner"
        style={{
          height: "20rem",
          objectFit: "contain",
        }}
      />
    </div>
  )
}
