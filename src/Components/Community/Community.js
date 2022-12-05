import React from "react";
import { useSelector } from "react-redux";
import { getLocalData } from "../../store/native";
import { ACCESS_TOKEN } from "../../store/native/common_keys";
import { ENDPOINT_BASE } from "../../store/__base/config";
import { obtainCSRF } from "../../store/__base/csrf";
import { generateAuthenticationWithCSRFHeader } from "../../store/__base/headerUtils";
import { fetchJsonWithCookie } from "../../utils/fetch";
import { useContentLoader, usePageTitle } from "../../utils/reactHooks";
import SubmitButton from "../common/SubmitButton";
import BannerCommunity from "./assets/banner_community.gif";
import "./Community.css";
async function submitMessage(message, postid) {
  try {
    let access_token = getLocalData(ACCESS_TOKEN);
    if (!access_token) {
      alert("Cannot post, unauthorized");
      return;
    }
    let csrf = await obtainCSRF();
    if (!csrf) {
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
      throw new Error(json.message ?? "Something went wrong!");
    } else {
      alert("Posted");
      return true;
    }
  } catch (e) {
    console.error(e);
    throw new Error("Cannot post without logging in or SignUp");
  }
}

const memoMessage = (e) =>
  React.memo(
    e,
    (props, newProps) =>
      props.content.message_id === newProps.content.message_id
  );
const CommunityPostMemoed = memoMessage(CommunityPost);

const CommunityReply = memoMessage(({ content }) => {
  return (
    <div className="replies-thread-item">
      <span className="message-username">@{content.username}</span> on{" "}
      {new Date(content.time).toLocaleString()}
      <br />
      <span className="contain-community-post">{content.message}</span>
    </div>
  );
});

function CommunityPost({ content }) {
  const user = useSelector((state) => state.user);
  const submit_handle = React.useRef();
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      if (action?.refresh) {
        return { ...state, ...(action.data ?? {}), nonce: state.nonce + 1 };
      }
      //submit handler
      if (
        action?.submit &&
        state.new_discussion_message &&
        !submit_handle.current
      ) {
        //side effect: submit the stuffs
        submit_handle.current = 1;
        submitMessage(state.new_discussion_message, content.message_id)
          .then((z) => {
            if (!z) return;
            dispatch({
              refresh: 1,
              data: { new_discussion_message: "" },
            });
          })
          .catch(window.alert.bind(window))
          .finally(() => (submit_handle.current = 0));
        return { ...state };
      }
      let state_dup = { ...state };
      state_dup[action.key] = action.value;
      return state_dup;
    },
    { nonce: 0, limit: 10 }
  );
  const replies = useContentLoader(
    () => {
      return fetchJsonWithCookie(
        `${ENDPOINT_BASE}/community/General/${content.message_id}/replies?limit=${state.limit}&nonce=${state.nonce}`
      );
    },
    [state.nonce, content.message_id, state.limit],
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
    <div className="topic-thread-container">
      <div
        style={{
          background: "white",
          padding: "1vw",
          borderRadius: "unset",
        }}
      >
        <div className="User-threads">
          <p className=" User-threads-p">
            <span className="message-username">@{content.username}</span> on{" "}
            {new Date(content.time).toLocaleString()}
            <br />
            <span className="contain-topic-thread">{content.message}</span>
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ submit: "main" });
          }}
        >
          <input
            type="text"
            placeholder="Reply to this discussion here"
            name="new_discussion_message"
            onChange={updateForm}
            style={{
              width: "calc(99% - 40px)",
              display: "inline-block",
              border: "1px solid black",
              borderRadius: "unset",
              verticalAlign: "top",
            }}
            autoComplete="off"
            value={state.new_discussion_message ?? ""}
          />
          <SubmitButton
            disabled={
              !state.new_discussion_message ||
              submit_handle.current ||
              !user.data
            }
          />
        </form>
      </div>
      <div className="replies-thread">
        {" "}
        {replies?.results && (
          <>
            {replies.results.map((z) => (
              <CommunityReply content={z} key={z.message_id} />
            ))}
            {replies.results.length === state.limit ? (
              <button
                className="community-load-more"
                onClick={() => {
                  dispatch({ key: "limit", value: state.limit + 10 });
                }}
              >
                Load More
              </button>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Community() {
  usePageTitle("Community");
  const user = useSelector((state) => state.user);
  const submit_handle = React.useRef();
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      if (action?.refresh) {
        return { ...state, ...(action.data ?? {}), nonce: state.nonce + 1 };
      }
      //submit handler
      if (
        action?.submit &&
        state.new_discussion_message &&
        !submit_handle.current
      ) {
        //side effect: submit the stuffs
        submit_handle.current = 1;
        submitMessage(state.new_discussion_message)
          .then((z) => {
            if (!z) return;
            dispatch({
              refresh: 1,
              data: { new_discussion_message: "" },
            });
          })
          .catch(window.alert.bind(window))
          .finally(() => (submit_handle.current = 0));
        return { ...state };
      }
      let state_dup = { ...state };
      state_dup[action.key] = action.value;
      return state_dup;
    },
    { nonce: 0, limit: 10 }
  );
  const posts = useContentLoader(
    () => {
      return fetchJsonWithCookie(
        `${ENDPOINT_BASE}/community/General?limit=${state.limit}&nonce=${state.nonce}`
      );
    },
    [state.nonce, state.limit],
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
      <div className="main-topic-container">
        <div className="community-banner hide-mobile hide-tablet">
          <img
            className="community-banner-img"
            src={BannerCommunity}
            alt="banner-community"
          />
        </div>
        <div className="topic-title">
          {" "}
          <h1 className="topic-title-thread">Start a new thread </h1>
        </div>
        <div className="main-container-thread-topic">
          <form
            className="create-thread-topic"
            style={{
              background: "white",
              padding: "1vw",
              borderRadius: "unset",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              dispatch({ submit: "main" });
            }}
          >
            <input
              type="text"
              placeholder="Start a discussion here"
              name="new_discussion_message"
              value={state.new_discussion_message ?? ""}
              onChange={updateForm}
              style={{
                width: "calc(99% - 40px)",
                display: "inline-block",
                border: "1px solid black",
                borderRadius: "unset",
              }}
              autoComplete="off"
            />
            <SubmitButton
              disabled={
                !state.new_discussion_message ||
                submit_handle.current ||
                !user.data
              }
            />
          </form>
        </div>
        <div className="thread-container">
          <div className="thread-title">
            {" "}
            <h1 className="title-thread"> Ongoing Threads </h1>
            {posts?.results &&
              posts.results.map((z) => (
                <CommunityPostMemoed content={z} key={z.message_id} />
              ))}
            {posts?.results?.length === state.limit ? (
              <button
                className="community-load-more"
                onClick={() => {
                  dispatch({ key: "limit", value: state.limit + 10 });
                }}
              >
                Load More
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Community);
