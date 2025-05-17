class RenamePostIdColumnsForCommentsAndVoters < ActiveRecord::Migration[5.2]
  def change
    rename_column :comments, :post_id, :text_id
    rename_column :voters, :post_id, :text_id
  end
end
