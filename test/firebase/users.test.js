const firebase = require('@firebase/rules-unit-testing')

const MY_PROJECT_ID = "mtg-horde-5b6a1"

const myId = "user_abc"
const myAuth = {uid: myId, email: "test@test.test"}
const theirId = "user_deg"

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

  it("Cannot update an other user room", async () => {
    const setupDoc = getAdminFirestore().collection("rooms").doc("theirRoomId")
    await setupDoc.set({ ownerId: theirId })

    const db = getFirestore(myAuth)
    const testDoc = db.collection("rooms").doc(setupDoc.id)
    await firebase.assertFails(testDoc.set({ foo: "bar", ownerId: myId }))
  })

  it("Can read a room of other user", async () => {
      const setupDoc = getAdminFirestore().collection("rooms").doc("theirRoomId")
      await setupDoc.set({ ownerId: theirId })

      const db = getFirestore(myAuth)
      const testDoc = db.collection("rooms").doc(setupDoc.id)
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
})

after(() => {
  firebase.clearFirestoreData({ projectId: MY_PROJECT_ID })
})
