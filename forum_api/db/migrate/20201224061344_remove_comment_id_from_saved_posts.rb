class RemoveCommentIdFromSavedPosts < ActiveRecord::Migration[5.2]
  def change
    remove_column :saved_posts, :comment_id, :string
  end
end
