class RemoveDeletedAtFromPosts < ActiveRecord::Migration[5.2]
  def change
    remove_column :texts, :deleted_at
  end
end
