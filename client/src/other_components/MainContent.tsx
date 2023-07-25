export default function MainContent({ children }: React.PropsWithChildren<{}>) {
  return (
    <main>
      <h1>MainContent</h1>
      {children}
    </main>
  )
}
