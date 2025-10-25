import { FaSortAmountUp } from "react-icons/fa";
import CommentForm from "./CommentForm";
import CommentItem from "./Comment";

export const CommentsSection = ({
  comments,
  setComments,
  newComment,
  setNewComment,
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4">{comments.length} Comments</h3>

      <CommentForm
        newComment={newComment}
        setNewComment={setNewComment}
        setComments={setComments}
      />

      <div className="mt-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
