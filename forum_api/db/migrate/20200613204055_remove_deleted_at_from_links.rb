class RemoveDeletedAtFromLinks < ActiveRecord::Migration[5.2]
  def change
    remove_column :links, :deleted_at, :datetime
  end
end
