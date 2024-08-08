/** @desc Fetch user info from the database. */
export const fetchUserDetails = async (accessToken, user) => {
  // Create new header with user info.
  const customHeaders = {
    'X-User-Info': JSON.stringify({
      email: user.email,
      nickname: user.nickname,
      sub: user.sub
    })
  }

  try {
    const response = await fetch('http://localhost:3001/api/v1/users', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...customHeaders
      }
    })

    const json = await response.json()
    return json
  } catch (err) {
    console.log(err.message)
  }
}

/** @desc Save a workout to the database. */
export const saveWorkout = async (accessToken, userId, workout) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/v1/workouts/user/${userId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workout)
      }
    )

    const json = await response.json()
    return json
  } catch (err) {
    console.log(err.message)
  }
}
