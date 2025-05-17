# frozen_string_literal: true

class AddOwnerAndDescriptionToJets < ActiveRecord::Migration[5.2]
  def change
    add_column :jets, :voter_id, :string
    add_column :jets, :description, :text
  end
end
