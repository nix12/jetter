class AddPositionToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :position, :integer
  end
end
