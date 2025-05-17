# frozen_string_literal: true

class MergeLinkIdAndTextIdToPostId < ActiveRecord::Migration[5.2]
  def change
    remove_column :comments, :text_id
    remove_column :comments, :link_id
    add_column :comments, :post_id, :string
  end
end
