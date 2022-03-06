
export function shopReducer(state, action) {
    switch (action.type) {
      case "UPDATE_MONEY":
        return {
          ...state,
          cash: action.item,
        };
      case "FILL_MACHINE":
        return {
          ...state,
          products: action.item,
        };
      case "UPDATE_SHOP":
        const product = action.item;
        return {
          ...state,
          shop: [...state.shop,{...product,UUID:findId(state.shop,state.shop.length + 1)}],
        };
      case "PULL_SHOP":
        let shopPull = state.shop.filter((item) => item.UUID !== action.item.UUID);
  
        return { ...state, shop: shopPull };
      default:
        return state;
    }
  }
  function findId(shop,id){
      if(shop.find(item=>item.id === id)){
        return shop.length + 1;
      }else{
        return id;
      }
  }