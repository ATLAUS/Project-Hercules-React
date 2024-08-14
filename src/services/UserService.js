const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001/api/v1'

// TODO: Pascal Case exported functions.
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
    const response = await fetch(`${baseURL}/users`, {
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

    const response = await fetch(`${baseURL}/workouts/userId/${userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workoutWithName)
    })

    const json = await response.json()
    return json
  } catch (err) {
    console.log(err.message)
  }
}

/** @desc Fetch a workout by id. */
export const fetchWorkoutByID = async (accessToken, workoutId) => {
  try {
    const response = await fetch(`${baseURL}/workouts/${workoutId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const json = await response.json()
    return json
  } catch (error) {
    console.log(error.message)
  }
}

/** @desc Delete a users workout by ID. */
export const DeleteWorkoutByID = async (accessToken, workoutId) => {
  try {
    const response = await fetch(`${baseURL}/workouts/${workoutId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const json = await response.json()
    return json
  } catch (error) {
    console.log(error.message)
  }
}
