class AddLinkIdToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :link_id, :string
  end
end
