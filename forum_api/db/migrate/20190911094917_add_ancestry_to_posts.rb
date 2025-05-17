class AddAncestryToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :ancestry, :string
    add_index :posts, :ancestry
  end
end
