const utils = require('./utils')

const myId = "user_abc"
const myAuth = {uid: myId, email: "test@test.test"}
const secondUserId = "user_deg"
const thirdUserId = "user_hji"

const dummyOfferData = {
    offerSdp: "Lorem ipsum"
}

describe("User", () => {
    it ("Can create an offer for a user", async () => {
        const adminDoc = utils.getAdminFirestore().collection("rooms").doc()
        await adminDoc.set({ ownerId: secondUserId })

        const db = utils.getFirestore(myAuth)
        const testDoc = db.collection(`rooms/${adminDoc.id}/stream-offers`).doc()
        const data = Object.assign({ for: thirdUserId, by: myId }, dummyOfferData)
        await utils.firebase.assertSucceeds(testDoc.set(data))
    })

    it ("Can reply to an offer for a user", async () => {
        const adminRoomDoc = utils.getAdminFirestore().collection("rooms").doc()
        await adminRoomDoc.set({ ownerId: secondUserId })

        const adminOfferDoc = utils.getAdminFirestore()
            .collection(`rooms/${adminRoomDoc.id}/stream-offers`).doc()
        const data = Object.assign({ forId: myId, byId: secondUserId }, dummyOfferData)
        await adminOfferDoc.set(data)

        const db = utils.getFirestore(myAuth)
        const testDoc = db.collection(`rooms/${adminRoomDoc.id}/stream-offers`).doc(adminOfferDoc.id)
        await utils.firebase.assertSucceeds(testDoc.set({ answerSdp: "Lorem ipsum" }, {merge: true}))
    })

    it ("Cannot reply to an offer not made for them",  async () => {
        const adminRoomDoc = utils.getAdminFirestore().collection("rooms").doc()
        await adminRoomDoc.set({ ownerId: secondUserId })

        const adminOfferDoc = utils.getAdminFirestore()
            .collection(`rooms/${adminRoomDoc.id}/stream-offers`).doc()
        const data = Object.assign({ forId: thirdUserId, byId: secondUserId }, dummyOfferData)
        await adminOfferDoc.set(data)

        const db = utils.getFirestore(myAuth)
        const testDoc = db.collection(`rooms/${adminRoomDoc.id}/stream-offers`).doc(adminOfferDoc.id)
        await utils.firebase.assertFails(testDoc.set({ answerSdp: "Lorem ipsum" }, {merge: true}))
    })

    it ("Can listen for offers made to them", async () => {
        const adminRoomDoc = utils.getAdminFirestore().collection("rooms").doc()
        await adminRoomDoc.set({ ownerId: secondUserId })

        const db = utils.getFirestore(myAuth)
        await utils.firebase.assertSucceeds(
            db.collection(`rooms/${adminRoomDoc.id}/stream-offers`).where("forId", "==", myId).get()
        )

        const adminOfferDoc = utils.getAdminFirestore()
            .collection(`rooms/${adminRoomDoc.id}/stream-offers`).doc()
        const data = Object.assign({ forId: myId, byId: secondUserId }, dummyOfferData)
        await adminOfferDoc.set(data)

        await utils.firebase.assertSucceeds(
            db.collection(`rooms/${adminRoomDoc.id}/stream-offers`).where("forId", "==", myId).get()
        )
    })
})
