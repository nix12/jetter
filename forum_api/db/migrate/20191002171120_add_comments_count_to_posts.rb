# frozen_string_literal: true

class AddCommentsCountToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :comments_count, :integer, default: 0, null: false

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
