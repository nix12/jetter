class RenamePostTableToText < ActiveRecord::Migration[5.2]
  def change
    rename_table :posts, :texts
  end
end
