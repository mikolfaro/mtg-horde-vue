const utils = require('./utils')

const myId = "user_abc"
const myAuth = {uid: myId, email: "test@test.test"}
const theirId = "user_deg"

describe("User", () => {
  it("Can create a new room with fixed id", async () => {
    const db = utils.getFirestore(myAuth)
    const testDoc = db.collection("rooms").doc("myRoomId")
    await utils.firebase.assertSucceeds(testDoc.set({ ownerId: myId }))
  })

  it("Can create a new room without id", async () => {
    const db = utils.getFirestore(myAuth)
    await utils.firebase.assertSucceeds(db.collection("rooms").add({ ownerId: myId }))
  })

  it("Can read a room of other user", async () => {
      const setupDoc = utils.getAdminFirestore().collection("rooms").doc("theirRoomId")
      await setupDoc.set({ ownerId: theirId })

      const db = utils.getFirestore(myAuth)
      const testDoc = db.collection("rooms").doc(setupDoc.id)
      await utils.firebase.assertSucceeds(testDoc.get())
  })

  it("Cannot read all the rooms created", async () => {
      const db = utils.getFirestore(myAuth)
      const testQuery = db.collection("rooms")
      await utils.firebase.assertFails(testQuery.get())
  })

  it("Can update their own room", async () => {
    const adminDoc = utils.getAdminFirestore().collection("rooms").doc("myRoomId")
    await adminDoc.set({ ownerId: myId })

    const db = utils.getFirestore(myAuth)
    const testDoc = db.collection("rooms").doc(adminDoc.id)
    await utils.firebase.assertSucceeds(testDoc.set({ foo: "bar", ownerId: myId }))
    await utils.firebase.assertSucceeds(testDoc.update({ "foo": "bar"}))
  })

  it("Cannot update an other user room", async () => {
    const adminDoc = utils.getAdminFirestore().collection("rooms").doc("theirRoomId")
    await adminDoc.set({ ownerId: theirId })

    const db = utils.getFirestore(myAuth)
    const testDoc = db.collection("rooms").doc(adminDoc.id)
    // await firebase.assertFails(testDoc.update({ foo: "bar", ownerId: myId }))
    await utils.firebase.assertFails(testDoc.set({ foo: "bar", ownerId: myId }, { merge: true }))
  })
})
