import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetRepliesQuery } from "@/redux/features/comment/commentApi";
import { ChevronDown, ChevronUp, Edit, MessageCircle, MoreVertical, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import ReplyCard from "./ReplyCard";

const CommentCard = ({
  comment,
  user,
  onEdit,
  onDelete,
  setDeleteId,
  onLike,
  onDislike,
  onReply,
}) => {
  const isOwner = user?.userId === comment.user;
  const hasLiked = comment.likes?.includes(user?.userId);
  const hasDisliked = comment.dislikes?.includes(user?.userId);
  const [showReplies, setShowReplies] = useState(false);


    const { data: repliesData, isLoading: repliesLoading } = useGetRepliesQuery(
    comment._id,
    {
      skip: !showReplies,
    }
  );

  const repliesCount = repliesData?.data?.length || 0;

  return (
    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-white font-semibold text-sm">
              {comment.userName?.[0]?.toUpperCase() || "U"}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold text-gray-800">
                  {comment.userName || "Anonymous"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {isOwner && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onEdit(comment)}
                      className="cursor-pointer"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={onDelete}
                      className="cursor-pointer text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Content */}
            <p className="text-gray-700 mb-4 leading-relaxed">
              {comment.content}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(comment._id)}
                className={`hover:bg-blue-50 ${
                  hasLiked ? "text-blue-600" : "text-gray-600"
                }`}
              >
                <ThumbsUp
                  className={`w-4 h-4 mr-1 ${hasLiked ? "fill-current" : ""}`}
                />
                {comment.likes?.length || 0}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDislike(comment._id)}
                className={`hover:bg-red-50 ${
                  hasDisliked ? "text-red-600" : "text-gray-600"
                }`}
              >
                <ThumbsDown
                  className={`w-4 h-4 mr-1 ${
                    hasDisliked ? "fill-current" : ""
                  }`}
                />
                {comment.dislikes?.length || 0}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReply(comment._id)}
                className="text-gray-600 hover:bg-purple-50 hover:text-purple-600"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Reply
              </Button>
            </div>
              {/* Replies Section */}
            {comment.replyCount > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplies(!showReplies)}
                  className="text-blue-600 hover:bg-blue-50 font-medium"
                >
                  {showReplies ? (
                    <ChevronUp className="w-4 h-4 mr-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 mr-2" />
                  )}
                  {showReplies ? "Hide" : "View"} {comment.replyCount}{" "}
                  {comment.replyCount === 1 ? "Reply" : "Replies"}
                </Button>

                {/* Display Replies */}
                {showReplies && (
                  <div className="mt-4 space-y-4 pl-4 border-l-2 border-blue-200">
                    {repliesLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                        <span className="ml-2 text-sm text-gray-600">
                          Loading replies...
                        </span>
                      </div>
                    ) : repliesCount > 0 ? (
                      repliesData?.data?.map((reply) => (
                        <ReplyCard
                          key={reply._id}
                          reply={reply}
                          user={user}
                          onEdit={onEdit}
                          onDelete={onDelete}
                          setDeleteId={setDeleteId}
                          onLike={onLike}
                          onDislike={onDislike}
                        />
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 py-2">
                        No replies yet.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  user: PropTypes.object,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
setDeleteId: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
};

export default CommentCard;