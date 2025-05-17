class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :jet_id
      t.string :hash_id
      t.string :voter_id
      t.string :ancestry
      t.integer :cached_votes_score, default: 0
      t.integer :comments_count, default: 0, null: false

      t.timestamps
    end
  end
end
