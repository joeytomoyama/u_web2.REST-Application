export async function readFromStream(
  stream: ReadableStream<Uint8Array>,
): Promise<string> {
  const reader = stream.getReader()
  let result = ""

  while (true) {
    const { done, value } = await reader.read()

    if (done) {
      break
    }

    // Convert the Uint8Array to a string
    const chunk = new TextDecoder().decode(value)

    // Append the chunk to the result
    result += chunk
  }

  return result
}
