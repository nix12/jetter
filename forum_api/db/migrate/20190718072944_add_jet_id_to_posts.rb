# frozen_string_literal: true

class AddJetIdToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :jet_id, :string
    add_index :posts, :jet_id
  end
end
