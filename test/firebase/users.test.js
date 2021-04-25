const utils = require('./utils')

const myId = "user_abc"
const myAuth = {uid: myId, email: "test@test.test"}
const theirId = "user_deg"

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
  })
})
