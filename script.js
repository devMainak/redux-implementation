import { createStore } from 'redux'
import profileReducer from './profileReducer'
import { addProfile, removeProfile, calculateAverageAge } from './actions'

const store = createStore(profileReducer)

store.subscribe(() => {
  console.log(store.getState())
  updateAverageAge()
})

const userProfileList = document.querySelector("#userProfileList")
const userProfileForm = document.querySelector('#userProfileForm')
const averageAgeOfProfiles = document.querySelector("#averageAge")
const removeProfileBtn = document.querySelector("#removeProfileBtn")

const addProfileHandler = (event) => {
  event.preventDefault()

  const profileId = document.querySelector("#profileId").value
  const profileName = document.querySelector("#profileName").value
  const profileAge = document.querySelector("#profileAge").value

  const newUserProfile = {
    id: profileId ? Number(profileId) : undefined,
    name: profileName ? profileName : undefined,
    age: profileAge ? Number(profileAge) : undefined
  }

  if (newUserProfile.name && newUserProfile.id && newUserProfile.age) {
  store.dispatch(addProfile(newUserProfile))
  store.dispatch(calculateAverageAge())
  renderProfiles()
  updateAverageAge()
  } else {
    averageAgeOfProfiles.textContent = `Enter correct profile data.`
    averageAgeOfProfiles.style.color = `red`
  }
}

const removeProfileHandler = () => {
  const removeProfileId = document.querySelector("#removeProfileId").value
  const { profiles } = store.getState()
  if (removeProfileId && profiles.find(profile => {
    if (profile.id === Number(removeProfileId))
      return true
    else return false
  }))
  {
    store.dispatch(removeProfile(removeProfileId))
    store.dispatch(calculateAverageAge())
    renderProfiles()
    updateAverageAge()
  } else {
    averageAgeOfProfiles.style.color = 'red'
    averageAgeOfProfiles.textContent = `No profile found with that ID.`
  }
}

userProfileForm.addEventListener("submit", addProfileHandler)
removeProfileBtn.addEventListener("click", removeProfileHandler)


const renderProfiles = () => {
  userProfileList.innerHTML = ""
  const { profiles } = store.getState()
  userProfileList.innerHTML = profiles.map(profile => `<li>${profile.id}. ${profile.name} (${profile.age} years old)</li>`).join("")
}

const updateAverageAge = () => {
  const { averageAge } = store.getState()
  averageAgeOfProfiles.style.color = `black`
  averageAgeOfProfiles.textContent = averageAge != 0 ? `Average Age: ${averageAge.toFixed(2)}` : ``
}

