/**
 * Base reducer for all the stores
 * @template T
 * @param domain {string} The base domain the system should listen to
 * @param state {T} the statement
 */
export default function baseReducer(domain, state, payload) {
  let duplicate = { ...(state ?? {}) };
  console.log(payload);
  switch (payload.type) {
    case `${domain}/patch`: {
      Object.assign(duplicate, payload.diff);
      return duplicate;
    }
    case `${domain}/overwrite`: {
      return payload.data;
    }
    case `${domain}/wipe`: {
      duplicate[domain] = {};
      return duplicate;
    }
    default:
      return state ?? {};
  }
}
