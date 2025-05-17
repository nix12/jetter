class AddMissingFieldsAndIndexesToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :body, :text
    add_column :posts, :uri, :string
    add_index :posts, :ancestry, name: "index_posts_on_ancestry"
    add_index :posts, :hash_id, name: "index_posts_on_hash_id"
    add_index :posts, :jet_id, name: "index_posts_on_jet_id"
    add_index :posts, :voter_id, name: "index_posts_on_voter_id"
  end
end
