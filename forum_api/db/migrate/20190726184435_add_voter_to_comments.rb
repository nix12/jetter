class AddVoterToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :voter_id, :string
    add_index :comments, :voter_id
  end
end
