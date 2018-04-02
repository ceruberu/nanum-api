// "id": 1,
// "title": "전신거울 필요하신분 무료나눔해요",
// "content": `댓글이나 전화주세요`,
// // User object
// "donator": "USERID12345",
// "tags": ["#거울", "#전신거울"],
// "date_publisheed": "2018-3-28",
// // indexed
// "date_updated": "2018-3-29",
// "date_finished": null,
// "image_url": "ASDASD",
// "city" : "서울",
// "district" : "송파구",
// "neighborhood" : "삼전동",
// // Request Objects
// "requests": [{
//   "requestID": "REQUEST1234",
//   "requestorID": "USERID1234"
//   },],

const Item = `
  enum DONATE_STATUS {
    DONE,
    CANCLED,
    ONGOING
  }

  type Item {
    _id: ID!
    fromNow: String
    donatorID: ID
    title: String!
    created_at: DateTime
    updated_at: DateTime
    finished_at: DateTime
    tags: [String]
    receiver: ID
    donate_status: DONATE_STATUS
    image_url: String
    city: String
  }

  input ItemInput {
    title: String!
    city: String
  }
`

export default Item;