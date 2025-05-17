class AddDownvotedItemsToVoter < ActiveRecord::Migration[5.2]
  def change
    add_column :voters, :downvoted_items, :text, array: true, default: []
  end
end
