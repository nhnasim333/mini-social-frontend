import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useCreateCommentMutation,
  useGetAllCommentsQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useDislikeCommentMutation,
  useGetCommentStatsQuery,
} from "@/redux/features/comment/commentApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Send,
  Clock,
  Filter,
  User,
  MoreVertical,
  LogOut,
} from "lucide-react";
import CommentCard from "./CommentCard";
import { DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/features/auth/authSlice";

const CommentsPage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const { register, handleSubmit, reset, setValue } = useForm();

    const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const { data: commentsData, isLoading } = useGetAllCommentsQuery({
    page,
    limit: 10,
    sortBy,
  });
   const { data: commentsStat } = useGetCommentStatsQuery();

  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [likeComment] = useLikeCommentMutation();
  const [dislikeComment] = useDislikeCommentMutation();

  const onSubmit = async (data) => {
    if (!data.content.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const commentData = {
        content: data.content,
        ...(replyTo && { parentComment: replyTo }),
      };

      if (editingId) {
        await updateComment({ id: editingId, data: commentData }).unwrap();
        toast.success("Comment updated successfully!");
        setEditingId(null);
      } else {
        await createComment(commentData).unwrap();
        toast.success("Comment posted successfully!");
      }

      reset();
      setReplyTo(null);
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setValue("content", comment.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    try {
      await deleteComment(deleteId).unwrap();
      toast.success("Comment deleted successfully!");
      setDeleteId(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete comment");
    }
  };

  const handleLike = async (id) => {
    try {
      await likeComment(id).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to like comment");
    }
  };

  const handleDislike = async (id) => {
    try {
      await dislikeComment(id).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to dislike comment");
    }
  };

  const handleReply = (commentId) => {
    setReplyTo(commentId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setReplyTo(null);
    reset();
  };

  const sortOptions = [
    { value: "newest", label: "Newest First", icon: Clock },
    { value: "mostLiked", label: "Most Liked", icon: ThumbsUp },
    { value: "mostDisliked", label: "Most Disliked", icon: ThumbsDown },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      {/* Header with User Profile */}
      <div className="max-w-4xl mx-auto mb-8">
        {/* User Profile Section */}
        <div className="flex items-center justify-between mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-blue-500">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-800">{user?.name || "User"}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-blue-50"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm">
                <User className="mr-0 h-4 w-4" />
                {user?.email}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Community Comments
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Share your thoughts and engage with the community
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {commentsStat?.data?.totalComments || 0}
                  </p>
                  <p className="text-sm text-gray-600">Total Comments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <ThumbsUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {commentsStat?.data?.totalLikes || 0}
                  </p>
                  <p className="text-sm text-gray-600">Total Likes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {commentsStat?.data?.totalUsers || 0}
                  </p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comment Form */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            {(editingId || replyTo) && (
              <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="text-sm text-blue-800 font-medium">
                  {editingId
                    ? "✏️ Editing comment..."
                    : "↩️ Replying to comment..."}
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Textarea
                  {...register("content", { required: true })}
                  placeholder="Share your thoughts..."
                  className="min-h-[100px] border-gray-200 focus:border-blue-400 focus:ring-blue-400 resize-none"
                />
              </div>
              <div className="flex gap-2 justify-end">
                {(editingId || replyTo) && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={cancelEdit}
                    className="border-gray-300"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {editingId ? "Update" : replyTo ? "Reply" : "Post Comment"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sort Filter */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">All Comments</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-gray-300 hover:border-blue-400"
              >
                <Filter className="w-4 h-4 mr-2" />
                {sortOptions.find((opt) => opt.value === sortBy)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className="cursor-pointer"
                >
                  <option.icon className="w-4 h-4 mr-2" />
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading comments...</p>
            </div>
          ) : commentsData?.data?.length === 0 ? (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </CardContent>
            </Card>
          ) : (
            commentsData?.data?.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={comment}
                user={user}
                onEdit={handleEdit}
                onDelete={() => setDeleteId(comment._id)}
                onLike={handleLike}
                onDislike={handleDislike}
                onReply={handleReply}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {commentsData?.meta?.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="border-gray-300"
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from(
                { length: commentsData?.meta?.totalPages },
                (_, i) => i + 1
              ).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "outline"}
                  onClick={() => setPage(pageNum)}
                  className={
                    page === pageNum
                      ? "bg-gradient-to-r from-blue-600 to-purple-600"
                      : "border-gray-300"
                  }
                >
                  {pageNum}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={page === commentsData?.meta?.totalPages}
              className="border-gray-300"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              comment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};


export default CommentsPage;