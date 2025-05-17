class AddHashIdToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :hash_id, :string
    add_index :comments, :hash_id
  end
end
