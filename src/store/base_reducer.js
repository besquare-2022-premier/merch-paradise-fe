/**
 * Base reducer for all the stores
 * @template T
 * @param domain {string} The base domain the system should listen to
 * @param state {T} the statement
 */
export default function baseReducer(
  domain,
  state = { loader_state: "uninitialized" },
  payload
) {
  switch (payload.type) {
    case `${domain}/failed`: {
      return { ...state, loader_state: "failed", error: e };
    }
    case `${domain}/update`: {
      return { ...state, loader_state: "loaded", data: payload.data };
    }
    case `${domain}/wipe`: {
      return { loader_state: "uninitialized" };
    }
    case `${domain}/loading`: {
      return { ...state, loader_state: "loading" };
    }
    case `${domain}/done`: {
      return { ...state, loader_state: "loaded" };
    }
    default:
      return state ?? { loader_state: "uninitialized" };
  }
}
