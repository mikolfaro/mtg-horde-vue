const firebase = require('@firebase/rules-unit-testing')

const MY_PROJECT_ID = "mtg-horde-5b6a1"

function getFirestore(auth) {
  return firebase.initializeTestApp({ projectId: MY_PROJECT_ID, auth: auth }).firestore()
}

function getAdminFirestore() {
  return firebase.initializeAdminApp({ projectId: MY_PROJECT_ID }).firestore()
}

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID })
})

after(async () => {
  await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID })
})

module.exports = {
  getFirestore,
  getAdminFirestore,
  firebase
}
