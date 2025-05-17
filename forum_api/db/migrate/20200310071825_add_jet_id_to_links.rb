class AddJetIdToLinks < ActiveRecord::Migration[5.2]
  def change
    add_column :links, :jet_id, :string
    add_index :links, :jet_id
  end
end
