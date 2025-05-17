class RemoveUpvotedItemsAndDownvotedItemsFromVoters < ActiveRecord::Migration[5.2]
  def change
    remove_column :voters, :upvoted_items, :text
    remove_column :voters, :downvoted_items, :text
  end
end
