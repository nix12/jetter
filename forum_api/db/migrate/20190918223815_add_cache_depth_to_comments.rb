class AddCacheDepthToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :ancestry_depth, :integer, default: 0
  end
end
