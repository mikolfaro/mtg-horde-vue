const assert = require("assert")
const firebase = require('@firebase/testing')

const MY_PROJECT_ID = "mtg-horde-5b6a1"

describe("MTG Horde", () => {
  it("Understands basic addiction", () => {
    assert.equal(2 + 2, 5)
  })

  it("Can read from readonly collection", () => {
    const db = firebase.initializeTestApp({ projectId: MY_PROJECT_ID }).firestore()
    const testDocument = db.collection("readOnly").doc("testDoc")
    await firebase.assertSucceeds(testDocument.doc())
  })
})
