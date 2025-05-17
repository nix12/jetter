class AddFieldsToLinks < ActiveRecord::Migration[5.2]
  def change
    add_column :links, :hash_id, :string
    add_index :links, :hash_id
    add_column :links, :voter_id, :string
    add_index :links, :voter_id
    add_column :links, :ancestry, :string
    add_index :links, :ancestry
    add_column :links, :cached_votes_score, :integer, default: 0
    add_column :links, :deleted_at, :datetime
    add_index :links, :deleted_at
    add_column :links, :comments_count, :integer, default: 0, null: false

    reversible do |dir|
      dir.up { data }
    end
  end

  def data
    execute <<-SQL.squish
        UPDATE posts
           SET comments_count = (SELECT count(1)
                                   FROM comments
                                  WHERE comments.commentable_id::text = posts.hash_id AND 
                                        comments.commentable_id::text = comments.hash_id)
    SQL
  end
end
