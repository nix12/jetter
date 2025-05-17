# frozen_string_literal: true

class CreateSavedPosts < ActiveRecord::Migration[5.2]
  def change
    create_table :saved_posts do |t|
      t.string :post_id
      t.string :comment_id
      t.string :voter_id

      t.timestamps
    end
  end
end
