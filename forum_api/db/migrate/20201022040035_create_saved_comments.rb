# frozen_string_literal: true

class CreateSavedComments < ActiveRecord::Migration[5.2]
  def change
    create_table :saved_comments do |t|
      t.column :voter_id, :string
      t.column :comment_id, :string

      t.timestamps
    end
  end
end
