# frozen_string_literal: true

class CreateVoters < ActiveRecord::Migration[5.2]
  def change
    create_table :voters do |t|
      t.string :username
      t.string :post_id
      t.string :comment_id

      t.timestamps
    end
    add_index :voters, :username
  end
end
