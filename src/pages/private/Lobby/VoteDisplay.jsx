import PropTypes from "prop-types";
import React, { useContext, useState, useEffect } from "react";
import { AddVote, AddComment } from "../../../hooks/Crud/VoteComment";
import { LobbyContext } from "./LobbyContext";

// eslint-disable-next-line no-unused-vars
function CommentOnVote({ description, author, warning, date }) {
  const context = useContext(LobbyContext);

  const [UserAuthor] = context.users
    .filter((user) => user.id === author)
    .map((user) => {
      if (user.id !== context.currentUser.id) {
        return user;
      }
      return { ...context.currentUser, email: "Moi" };
    });

  return (
    <>
      <hr className="my-2 ml-16 border-gray-200" />
      <div name="voteCom" className=" ml-4 flex flex-row pt-1 md-10 md:ml-16">
        <img
          className="w-12 h-12 border-2 border-gray-300 rounded-full"
          alt={UserAuthor?.email}
          src={UserAuthor.profilePicture}
          onError={(e) => {
            e.target.src = "./../../../../../public/templateAccount.png";
            return true;
          }}
        />
        <div className="flex-col mt-1">
          <div className="flex items-center flex-1 px-4 font-bold leading-tight">
            {UserAuthor?.email}
            <span className="ml-2 text-xs font-normal text-gray-500">
              {date}
            </span>
          </div>
          <div className="flex-1 pb-2 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
            {description}
          </div>
        </div>
      </div>
    </>
  );
}

function Vote({ vote, reply }) {
  const context = useContext(LobbyContext);
  const [UserAuthor] = context.users
    .filter((user) => user.id === vote.idUser)
    .map((user) => {
      if (user.id !== context.currentUser.id) {
        return user;
      }

      return { ...context.currentUser, email: "Moi" };
    });
  return (
    <div className="flex-col border mb-4 p-2 w-full py-4 mx-auto bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 rounded-lg shadow-sm ">
      <div name="voteCom" className="flex  flex-row">
        <img
          className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
          alt={UserAuthor?.email}
          src={UserAuthor?.profilePicture}
          onError={(e) => {
            e.target.src = "./../../../../../public/templateAccount.png";
            return true;
          }}
        />
        <div className="flex-col mt-1">
          <div className="flex items-center flex-1 px-4 font-bold leading-tight">
            {UserAuthor?.email}
            <span className="ml-2 text-xs font-normal text-gray-500">
              {new Date(vote.date).toLocaleDateString()}
            </span>
          </div>
          <button
            className="inline-flex items-center px-1 pt-2 ml-1 flex-column"
            type="button"
            onClick={() => {
              reply({ user: UserAuthor.id, id: vote.id });
            }}
          >
            <svg
              className="w-5 h-5 ml-2 text-gray-600 cursor-pointer fill-current hover:text-gray-900"
              viewBox="0 0 95 78"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                fillRule="nonzero"
              />
            </svg>
          </button>
          <button
            className="inline-flex items-center px-1 -ml-1 flex-column"
            type="button"
          >
            <svg
              className="w-5 h-5 text-gray-600 cursor-pointer  hover:text-gray-700"
              fill={vote.thumUp ? "#8a6afc45" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-1 pb-2 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
        {vote.description}
      </div>
      {vote.comment.map((comment) => (
        <CommentOnVote
          author={comment.id_user}
          key={comment.id}
          description={comment.description}
          warning={comment.warning}
          date={new Date().toLocaleDateString()}
        />
      ))}
    </div>
  );
}

function AddVoteOrComment({ OnComment, reply, currentUser }) {
  const context = useContext(LobbyContext);
  const [replyAuthor, setReplyAuthor] = useState(null);
  useEffect(() => {
    setReplyAuthor(context.users.filter((user) => user.id === reply?.user)[0]);
  }, [reply]);
  const [thumUp, setThumUp] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    OnComment({ message: e.target.description.value, thumUp: thumUp ? 1 : 0 });
  };
  return (
    <div className="flex-col  border  mb-4 p-2 w-full py-4 mx-auto bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 rounded-lg shadow-sm ">
      <div name="voteCom" className="">
        <div className="w-full flex justify-start space-x-3 items-center ">
          <img
            className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
            alt="Noob master's avatar"
            src={
              currentUser.profilePicture ||
              "./../../../../../public/templateAccount.png"
            }
          />{" "}
          <div>
            <span className="text-xl">
              Ajouter un commentaire /
              <span className="text-gray-700"> vote</span>
            </span>
            <br />
            {reply && (
              <span className="text-sm">
                <span className="text-gray-700">Répondre à </span>
                {replyAuthor && replyAuthor.email}
              </span>
            )}
          </div>
          <button
            className="inline-flex items-center px-1 -ml-1 flex-column"
            type="button"
            onClick={() => {
              setThumUp((up) => !up);
            }}
          >
            <svg
              className="w-5 h-5 text-gray-600 cursor-pointer  hover:text-gray-700"
              fill={thumUp ? "#8a6afc45" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
          </button>
        </div>

        <div className="flex-col mt-2 ">
          <form onSubmit={onSubmit}>
            <textarea
              className="w-full h-32 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Ajouter un commentaire"
            />
            <button
              type="submit"
              className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Ajouter un commentaire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function VoteDisplay({ Htags: [Htag], currentProject }) {
  const [votes, setVotes] = useState(Htag?.votes || []);
  const [reply, setReply] = useState(null);
  const { currentUser } = useContext(LobbyContext);
  useEffect(() => {
    setVotes(Htag?.votes);
  }, [Htag]);
  const OnComment = ({ message, thumUp }) => {
    if (reply === null) {
      if (votes.filter((vote) => vote.idUser === currentUser.id).length > 0) {
        return;
        // tu a deja voté
      }
      AddVote(currentProject.id, Htag.id, {
        description: message,
        thumUp,
      });
      setVotes((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          idUser: currentUser.id,
          idHashtag: Htag.id,
          description: message,
          date: new Date(),
          comment: [],
        },
      ]);
      // tu n'a pas voté
    } else {
      // tu répond a un commentaire ou a un vote
      const newVotes = [...votes];
      const index = newVotes.findIndex((vote) => vote.id === reply.id);
      newVotes[index].comment.push({
        id: newVotes[index].comment.length + 1,
        id_vote: reply.id,
        id_user: currentUser.id,
        warning: 0,
        description: message,
      });
      // idProject, idHashtag, idVote,data
      AddComment(currentProject.id, Htag.id, reply.id, {
        warning: 0,
        description: message,
      });
      setVotes(newVotes);
    }
  };
  if (Htag) {
    return (
      Htag && (
        <section className=" container px-4">
          <div className="">
            {votes.map((vote) => (
              <Vote
                vote={vote}
                key={vote.id}
                reply={(e) => {
                  setReply((id) => (id === null ? e : null));
                }}
              />
            ))}
            <AddVoteOrComment
              currentUser={currentUser}
              OnComment={OnComment}
              reply={reply}
            />
          </div>
        </section>
      )
    );
  }

  return <div />;
}

AddVoteOrComment.defaultProps = {
  OnComment: () => {},
  reply: null,
  currentUser: null,
};

AddVoteOrComment.propTypes = {
  OnComment: PropTypes.func,
  reply: PropTypes.shape({
    user: PropTypes.number,
    id: PropTypes.number,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    profilePicture: PropTypes.string,
  }),
};
VoteDisplay.defaultProps = {
  Htags: null,
  currentProject: {},
};
VoteDisplay.propTypes = {
  Htags: PropTypes.arrayOf(PropTypes.shape({})),
  currentProject: PropTypes.shape({
    id: PropTypes.number,
  }),
};

CommentOnVote.defaultProps = {
  author: null,
  date: null,
  description: null,
  warning: null,
};

CommentOnVote.propTypes = {
  author: PropTypes.number || null,
  // eslint-disable-next-line react/forbid-prop-types
  date: PropTypes.any,
  description: PropTypes.string,
  warning: PropTypes.number || null,
};

Vote.defaultProps = {
  vote: {},
  reply: () => {},
};
Vote.propTypes = {
  vote: PropTypes.shape({
    id: PropTypes.number || undefined,
    idUser: PropTypes.number,
    idHashtag: PropTypes.number,
    description: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    date: PropTypes.any,
    comment: PropTypes.arrayOf(PropTypes.shape({})) || [] || null,
    thumUp: PropTypes.number || null,
  }),
  reply: PropTypes.func,
};
