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
    // TODO: Edit to check for an ENV and use the appropriate endpoint.
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
export const saveWorkout = async (accessToken, userId, workout, name) => {
  try {
    const workoutWithName = {
      ...workout,
      name
    }

    const response = await fetch(
      `http://localhost:3001/api/v1/workouts/userId/${userId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workoutWithName)
      }
    )

    const json = await response.json()
    return json
  } catch (err) {
    console.log(err.message)
  }
}
