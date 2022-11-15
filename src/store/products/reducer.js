import baseReducer from "../base_reducer";

const initialState = {
  state: "uninitialized",
  products: null,
  recommended: null,
  error: null,
  category: null,
  page: 1,
  query: "",
  loading: [],
};
export default function reducer(state = initialState, payload) {
  switch (payload.type) {
    case "products/loading":
      return {
        ...state,
        loader_state: "loading",
        loading: [...state.loading, payload.loading],
      };
    case "products/setCategory":
      return { ...state, category: payload.category };
    case "products/setCurrentPage":
      return { ...state, page: payload.page };
    case "products/setCurrentQuery":
      return { ...state, query: payload.query ?? "" };
    case "products/updateProducts":
      return {
        ...state,
        products: payload.data,
        loading: state.loading.filter((z) => z !== "products"),
      };
    case "products/updateRecommendedProducts":
      return {
        ...state,
        recommended: payload.data,
        loading: state.loading.filter((z) => z !== "recommended"),
      };
    case "products/wipe":
      return initialState;
    default:
      return baseReducer("products", state, payload);
  }
}
