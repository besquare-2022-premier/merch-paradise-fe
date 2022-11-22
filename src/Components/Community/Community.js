import React from "react";
import "./Community.css";

function Community() {
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
              name="message"
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
            >
              +
            </button>
          </div>
        </div>
        <div className="thread-container">
          <div className="thread-title">
            {" "}
            <h1 className="title-thread"> Ongoing Threads </h1>
          </div>
          <div>
            <div
              style={{
                background: "white",
                padding: "1vw",
                borderRadius: "unset",
              }}
            >
              <div className="User-threads">
                <p className=" User-threads-p">user thread is here</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Reply to this discussion here"
                  name="message"
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
                >
                  +
                </button>
              </div>
            </div>
            <div className="replies-thread">here are the replies</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Community;
