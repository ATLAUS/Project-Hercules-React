export const fetchUserDetails = async (accessToken) => {
  try {
    const response = await fetch('http://localhost:3001/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const json = await response.json()
    return json
  } catch (err) {
    console.log(err.message)
  }
}
