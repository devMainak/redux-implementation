export const ADD_PROFILE = "profile/added"
export const REMOVE_PROFILE = "profile/removed"
export const CALCULATE_AVERAGE_AGE = "profile/calculateAverageAge"

// Action creator func to add a profile
export const addProfile = (profile) => ({
  type: ADD_PROFILE,
  payload: profile
})

// Action creator func to remove a profile
export const removeProfile = (profileId) => ({
  type: REMOVE_PROFILE,
  payload: profileId
})

// Action creator func to calculate average age of profiles
export const calculateAverageAge = () => ({
  type: CALCULATE_AVERAGE_AGE
})