# frozen_string_literal: true

class AddCachedVotesToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :cached_votes_score, :integer, default: 0
  end
end
