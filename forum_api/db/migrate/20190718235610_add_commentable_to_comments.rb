# frozen_string_literal: true

class AddCommentableToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :commentable_id, :string
    add_index :comments, :commentable_id
    add_column :comments, :commentable_type, :string
  end
end
