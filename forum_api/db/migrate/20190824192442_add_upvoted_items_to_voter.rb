# frozen_string_literal: true

class AddUpvotedItemsToVoter < ActiveRecord::Migration[5.2]
  def change
    add_column :voters, :upvoted_items, :text, array: true, default: []
  end
end
