// import {createStore} from 'react-redux';

// const initialState = {
//     socket: null,
// }

// const reducer = (state = initialState, action) => {
//     const userId = action.payload.userId;
//     const socket = acion.payload.socket;
//     switch(action.type){
//         case 'CONNECT_SOCKET':
//             socket.send(JSON.stringify({
//                 userId: userId,
//                 status: 'Online',
//                 method: 'connection',
//               }))
//             return {
//               ...state,
//               socket,
//             };
//         case 'DISCONNECT_SOCKET':
//             socket.send(JSON.stringify({
//                 userId: user.id,
//                 status: 'Online',
//                 method: 'disconnection',
//               }))
//               return {
//                 ...state,
//                 socket,
//               };
//         default:
//             return state;
//     }
// }

// const socketStore = createStore(reducer);