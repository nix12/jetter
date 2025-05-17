class AddCachedVotesToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :cached_votes_score, :integer, default: 0
  end
end
