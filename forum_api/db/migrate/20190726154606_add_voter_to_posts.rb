class AddVoterToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :voter_id, :string
    add_index :posts, :voter_id
  end
end
