class ChangeColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :links, :link, :uri
  end
end
