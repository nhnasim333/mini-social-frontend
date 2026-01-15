import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Edit, MoreVertical, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

const ReplyCard = ({ reply, user, onEdit, setDeleteId, onLike, onDislike }) => {
  const isOwner = user?.userId === reply.user?._id;
  const hasLiked = reply.likes?.includes(user?.userId);
  const hasDisliked = reply.dislikes?.includes(user?.userId);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="text-white font-semibold text-xs">
            {reply.user?.name?.[0]?.toUpperCase() || "U"}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                {reply.user?.name || "Anonymous"}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(reply.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
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
                    className="h-6 w-6 p-0 hover:bg-gray-200"
                  >
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => onEdit(reply)}
                    className="cursor-pointer text-sm flex items-center mb-2"
                  >
                    <Edit className="w-3 h-3 mr-2" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDeleteId(reply._id)}
                    className="cursor-pointer text-red-600 text-sm flex items-center"
                  >
                    <Trash2 className="w-3 h-3 mr-2" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Content */}
          <p className="text-gray-700 text-sm mb-2 leading-relaxed">
            {reply.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(reply._id)}
              className={`h-7 hover:bg-blue-50 ${
                hasLiked ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <ThumbsUp
                className={`w-3 h-3 mr-1 ${hasLiked ? "fill-current" : ""}`}
              />
              <span className="text-xs">{reply.likes?.length || 0}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDislike(reply._id)}
              className={`h-7 hover:bg-red-50 ${
                hasDisliked ? "text-red-600" : "text-gray-600"
              }`}
            >
              <ThumbsDown
                className={`w-3 h-3 mr-1 ${
                  hasDisliked ? "fill-current" : ""
                }`}
              />
              <span className="text-xs">{reply.dislikes?.length || 0}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReplyCard.propTypes = {
  reply: PropTypes.object.isRequired,
  user: PropTypes.object,
  onEdit: PropTypes.func.isRequired,
  setDeleteId: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

export default ReplyCard;