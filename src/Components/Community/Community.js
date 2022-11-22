import React from "react";
import { useSelector } from "react-redux";
import { getLocalData } from "../../store/native";
import { ACCESS_TOKEN } from "../../store/native/common_keys";
import { ENDPOINT_BASE } from "../../store/__base/config";
import { obtainCSRF } from "../../store/__base/csrf";
import { generateAuthenticationWithCSRFHeader } from "../../store/__base/headerUtils";
import { fetchJsonWithCookie } from "../../utils/fetch";
import { useContentLoader } from "../../utils/reactHooks";
import "./Community.css";
let submitting = false;
async function submitMessage(message, postid) {
  if (submitting) return;
  try {
    let access_token = getLocalData(ACCESS_TOKEN);
    if (!access_token) {
      alert("Cannot post, unauthorized");
      return;
    }
    submitting = true;
    let csrf = await obtainCSRF();
    if (!csrf) {
      alert("Cannot post, no CSRF token");
      throw new Error("Cannot get token");
    }
    //construct a request to post it
    let json = await fetchJsonWithCookie(
      `${ENDPOINT_BASE}/community/General/${postid ?? ""}`,
      {
        headers: {
          ...generateAuthenticationWithCSRFHeader(access_token, csrf),
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ message }),
      },
      true
    );
    if (json?.status !== 0) {
      alert(json?.message ?? "Something went wrong!");
    }
  } finally {
    submitting = false;
  }
}

function CommunityPost({ content }) {
  const user = useSelector((state) => state.user);
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      if (action?.refresh) {
        return { ...state, nonce: state.nonce + 1 };
      }
      //submit handler
      if (action?.submit && state.new_discussion_message) {
        //side effect: submit the stuffs
        submitMessage(state.new_discussion_message, content.message_id).then(
          (z) => dispatch({ refresh: 1, submitting: null })
        );
        return { ...state, submitting: 1, new_discussion_message: "" };
      }
      let state_dup = { ...state };
      state_dup[action.key] = action.value;
      return state_dup;
    },
    { nonce: 0 }
  );
  const replies = useContentLoader(
    () => {
      return fetchJsonWithCookie(
        `${ENDPOINT_BASE}/community/General/${content.message_id}/replies?limit=50`
      );
    },
    [state.nonce, content],
    null
  );
  React.useEffect(() => {
    if (replies instanceof Error) {
      alert(replies.message);
    }
  }, [replies]);
  /**
   *
   * @param {React.FormEvent<HTMLInputElement>} e
   */
  function updateForm(e) {
    const element = e.nativeEvent.target;
    dispatch({ key: element.name, value: element.value });
  }
  return (
    <div>
      <div
        style={{
          background: "white",
          padding: "1vw",
          borderRadius: "unset",
        }}
      >
        <div className="User-threads">
          <p className=" User-threads-p">
            @{content.username} on {new Date(content.time).toLocaleString()}
            <br />
            {content.message}
          </p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Reply to this discussion here"
            name="new_discussion_message"
            onChange={updateForm}
            style={{
              width: "90%",
              display: "inline-block",
              border: "1px solid black",
              borderRadius: "unset",
            }}
            value={state.new_discussion_message ?? ""}
          />
          <button
            style={{
              textAlign: "center",
              width: "4%",
              display: "inline-block",
              color: "white",
              background: "var(--primary-color)",
              borderRadius: "unset",
              marginLeft: "3%",
              fontWeight: "900",
            }}
            onClick={() => dispatch({ submit: "main" })}
            disabled={
              !state.new_discussion_message &&
              (state.submitting || submitting || !user.data)
            }
          >
            +
          </button>
        </div>
      </div>
      <div className="replies-thread">
        {" "}
        {replies?.results &&
          (replies.results.length
            ? replies.results.map((z) => (
                <div className="replies-thread-item">
                  @{z.username} on {new Date(z.time).toLocaleString()}
                  <br />
                  {z.message}
                </div>
              ))
            : "No replies")}
      </div>
    </div>
  );
}

function Community() {
  const user = useSelector((state) => state.user);
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      if (action?.refresh) {
        return { ...state, nonce: state.nonce + 1 };
      }
      //submit handler
      if (action?.submit && state.new_discussion_message) {
        //side effect: submit the stuffs
        submitMessage(state.new_discussion_message).then((z) =>
          dispatch({ refresh: 1, submitting: null })
        );
        return { ...state, submitting: 1, new_discussion_message: "" };
      }
      let state_dup = { ...state };
      state_dup[action.key] = action.value;
      return state_dup;
    },
    { nonce: 0 }
  );
  const posts = useContentLoader(
    () => {
      return fetchJsonWithCookie(`${ENDPOINT_BASE}/community/General?limit=50`);
    },
    [state.nonce],
    null
  );
  React.useEffect(() => {
    if (posts instanceof Error) {
      alert(posts.message);
    }
  }, [posts]);
  /**
   *
   * @param {React.FormEvent<HTMLInputElement>} e
   */
  function updateForm(e) {
    const element = e.nativeEvent.target;
    dispatch({ key: element.name, value: element.value });
  }
  return (
    <>
      <div className="topic-container">
        <div className="topic-title">
          {" "}
          <h1 className="topic-title-thread">Start a new thread </h1>
        </div>
        <div>
          <div
            style={{
              background: "white",
              padding: "1vw",
              borderRadius: "unset",
            }}
          >
            <input
              type="text"
              placeholder="Start a discussion here"
              name="new_discussion_message"
              value={state.new_discussion_message ?? ""}
              onChange={updateForm}
              style={{
                width: "90%",
                display: "inline-block",
                border: "1px solid black",
                borderRadius: "unset",
              }}
            />
            <button
              style={{
                textAlign: "center",
                width: "4%",
                display: "inline-block",
                color: "white",
                background: "var(--primary-color)",
                borderRadius: "unset",
                marginLeft: "3%",
                fontWeight: "900",
              }}
              onClick={() => dispatch({ submit: "main" })}
              disabled={
                !state.new_discussion_message &&
                (state.submitting || submitting || !user.data)
              }
            >
              +
            </button>
          </div>
        </div>
        <div className="thread-container">
          <div className="thread-title">
            {" "}
            <h1 className="title-thread"> Ongoing Threads </h1>
            {posts?.results &&
              posts.results.map((z) => (
                <CommunityPost content={z} key={z.message_id} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Community;
