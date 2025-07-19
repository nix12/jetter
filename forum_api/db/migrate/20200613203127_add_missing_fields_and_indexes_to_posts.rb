class AddMissingFieldsAndIndexesToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :body, :text
    add_column :posts, :uri, :string
  end
end
