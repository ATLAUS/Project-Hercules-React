const geminiBaseURL =
  import.meta.env.VITE_GEMINI_BASE_URL || 'http://localhost:3001/api/v1/gemini'

export const fetchNewGeminiWorkout = async (
  accessToken,
  user,
  focus,
  type,
  level
) => {
  // Create new header with user info.
  const customHeaders = {
    'X-User-Info': JSON.stringify({
      email: user.email,
      nickname: user.nickname,
      sub: user.sub
    })
  }

  try {
    const response = await fetch(
      `${geminiBaseURL}/workout?focus=${focus}&type=${type}&level=${level}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...customHeaders
        }
      }
    )

    const workout = await response.json()
    return workout
  } catch (err) {
    console.log(err.message)
  }
}
