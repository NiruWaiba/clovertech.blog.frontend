// const Reducer = (state, Action) =>{
//     switch(Action.type){
//         case "LOGIN_START":
//         return {
//             user:null,
//             isFetching:true,
//             error:false
//         };
//         case "LOGIN_SUCCES":
//         return {
//             user:Action.payload,
//             isFetching:false,
//             error:false
//         };
//         case "LOGIN_FAILUR":
//         return {
//             user:null,
//             isFetching:false,
//             error:false
//         };
//         case "LOGIN_END":
//             return { ...state, isFetching: false }; // Reset isFetching to false
//             default:
//             return state;        
//     }
// };

// export default Reducer;

const Reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false,
        };
  
      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
  
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true,
        };

        case "LOGOUT":
        return {
          user: null,
          isFetching: false,
          error: false,
        };
  
      case "LOGIN_END":
        return {
          ...state,
          isFetching: false,
        };
  
      default:
        return state;
    }
  };
  
  export default Reducer;
  