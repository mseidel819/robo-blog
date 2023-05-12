import styles from "./upvoter.module.css";
import { useSession } from "next-auth/react";
import Loader from "../ui/loader/loader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeScore } from "@/store/comments/comments.reducer";

const Upvoter = ({ data }) => {
  const { data: session, status } = useSession();
  const [scoreLoading, setScoreLoading] = useState(false);
  const dispatch = useDispatch();

  const userEmail = session.user.email;

  const scoreChangeHandler = (id, email, voteDirection) => {
    const payload = {
      id,
      email,
      voteDirection,
    };
    setScoreLoading(true);
    fetch(`/api/comments/${data.articleId}`, {
      method: "PATCH",
      body: JSON.stringify({ id, userEmail, voteDirection }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "something went wrong");
        });
      })
      .then((data) => {
        dispatch(changeScore(payload));
        setScoreLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setScoreLoading(false);
      });
  };

  const upvoteHandler = () => {
    const id = data._id;

    scoreChangeHandler(id, userEmail, "upvoted");
  };

  const downvoteHandler = () => {
    const id = data._id;
    scoreChangeHandler(id, userEmail, "downvoted");
  };

  const getScore = () => {
    const upvotes = data.upvoted ? data.upvoted.length : 0;
    const downvotes = data.downvoted ? data.downvoted.length : 0;
    return upvotes - downvotes;
  };

  return (
    <>
      {(!session || (session && session.user.email === data.user.email)) && (
        <div className={styles.upvoter}>
          <span>{getScore()}</span>
        </div>
      )}
      {session && session.user.email !== data.user.email && (
        <div className={styles.upvoter}>
          <button className={styles.score_btn} onClick={upvoteHandler}>
            +
          </button>
          {!scoreLoading && <span>{getScore()}</span>}
          {scoreLoading && (
            <span>
              <Loader size="24px" color="black" />
            </span>
          )}

          <button className={styles.score_btn} onClick={downvoteHandler}>
            -
          </button>
        </div>
      )}
    </>
  );
};

export default Upvoter;
