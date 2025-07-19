# frozen_string_literal: true

class MergeLinkIdAndTextIdToPostId < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :post_id, :string
  end
end
