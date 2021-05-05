var express =require( 'express');
// controllers
var chatRoom =require( '../controllers/chatRoom.js');
var deleteController =require ('../controllers/delete.js');
var user=require ('../controllers/user.js');
const router = express.Router();

router
  .get('/', chatRoom.getRecentConversation)
  .get('/?id', chatRoom.getConversationByRoomId)
  .get('/', user.onGetAllUsers)
  .get('/:id', user.onGetUserById)

  .post('/', user.onCreateUser)
  .post('/initiate', chatRoom.initiate)
  .post('/:roomId/message', chatRoom.postMessage)

  .put('/:roomId/mark-read', chatRoom.markConversationReadByRoomId)
  .delete('/room/:roomId', deleteController.deleteRoomById)
  .delete('/message/:messageId', deleteController.deleteMessageById)
  .delete('/:id', user.onDeleteUserById)

module.exports =router;
