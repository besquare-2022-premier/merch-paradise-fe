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
    case "products/updateProducts": {
      const loading = state.loading.filter((z) => z !== "products");
      return {
        ...state,
        products: payload.data,
        loading,
        loader_state: loading.length === 0 ? "done" : "loading",
      };
    }
    case "products/updateRecommendedProducts": {
      const loading = state.loading.filter((z) => z !== "recommended");
      return {
        ...state,
        recommended: payload.data,
        loading,
        loader_state: loading.length === 0 ? "done" : "loading",
      };
    }
    case "products/wipe":
      return initialState;
    default:
      return baseReducer("products", state, payload);
  }
}
