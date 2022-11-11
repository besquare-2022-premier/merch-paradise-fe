import baseReducer from "../base_reducer";

export default function reducer(
  state = {
    state: "uninitialized",
    data: null,
    error: null,
    category: null,
    page: 1,
  },
  payload
) {
  switch (payload.type) {
    case "products/setCategory":
      return { ...state, category: payload.category };
    case "products/setCurrentPage":
      return { ...state, page: payload.page };
    case "products/setCurrentQuery":
      return { ...state, query: payload.query };
    default:
      return baseReducer("products", state, payload);
  }
}
