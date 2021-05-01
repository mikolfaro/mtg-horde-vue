<<<<<<< HEAD
const firebase = require('@firebase/rules-unit-testing')

const MY_PROJECT_ID = "mtg-horde-5b6a1"
=======
const utils = require('./utils')
>>>>>>> a6ddd2d8c0e7efe488107321f9708075ecbf461a

const myId = "user_abc"
const myAuth = {uid: myId, email: "test@test.test"}
const theirId = "user_deg"

<<<<<<< HEAD
function getFirestore(auth) {
  return firebase.initializeTestApp({ projectId: MY_PROJECT_ID, auth: auth }).firestore()
}

function getAdminFirestore() {
  return firebase.initializeAdminApp({ projectId: MY_PROJECT_ID }).firestore()
}

beforeEach(async () => {
  firebase.clearFirestoreData({ projectId: MY_PROJECT_ID })
})

describe("User", () => {
  it("Can write to a user document with the same ID as the user", async () => {
    const db = getFirestore(myAuth)
    const testDoc = db.collection("users").doc(myId)
    await firebase.assertSucceeds(testDoc.set({ name: "Tizio" }))
  })

  it("Cannot write to a user document with a different ID than the the user", async () => {
    const db = getFirestore(myAuth)
    const testDoc = db.collection("users").doc(theirId)
    await firebase.assertFails(testDoc.set({ name: "Tizio" }))
  })

  it("Can create a new room with fixed id", async () => {
    const db = getFirestore(myAuth)
    const testDoc = db.collection("rooms").doc("myRoomId")
    await firebase.assertSucceeds(testDoc.set({ ownerId: myId }))
  })

  it("Can create a new room without id", async () => {
    const db = getFirestore(myAuth)
    await firebase.assertSucceeds(db.collection("rooms").add({ ownerId: myId }))
  })

  it("Can read a room of other user", async () => {
      const setupDoc = getAdminFirestore().collection("rooms").doc("theirRoomId")
      await setupDoc.set({ owner: theirId })

      const db = getFirestore(myAuth)
      const testDoc = db.collection("rooms").doc("theirRoomId")
      await firebase.assertSucceeds(testDoc.get())
  })

  it("Cannot read all the rooms created", async () => {
      const db = getFirestore(myAuth)
      const testQuery = db.collection("rooms")
      await firebase.assertFails(testQuery.get())
  })

  it("Can update their room", async () => {
      const adminDoc = getAdminFirestore().collection("rooms").doc()
      await adminDoc.set({ owner: myId })

      const db = getFirestore(myAuth)
      const testDoc = db.collection("rooms").doc("myRoomId")
      await firebase.assertSucceeds(testDoc.set({ foo: "bar", ownerId: myId }))
  })

  it("Cannot update an other user room", async () => {
    const setupDoc = getAdminFirestore().collection("rooms").doc("theirRoomId")
    await setupDoc.set({ owner: theirId })

    const db = getFirestore(myAuth)
      const testDoc = db.collection("rooms").doc("theirRoomId")
      await firebase.assertFails(testDoc.set({ foo: "bar", ownerId: theirId }))
=======
describe("User", () => {
  it("Can write to a user document with the same ID as the user", async () => {
    const db = utils.getFirestore(myAuth)
    const testDoc = db.collection("users").doc(myId)
    await utils.firebase.assertSucceeds(testDoc.set({ name: "Tizio" }))
  })

  it("Cannot write to a user document with a different ID than the the user", async () => {
    const db = utils.getFirestore(myAuth)
    const testDoc = db.collection("users").doc(theirId)
    await utils.firebase.assertFails(testDoc.set({ name: "Tizio" }))
>>>>>>> a6ddd2d8c0e7efe488107321f9708075ecbf461a
  })
})
