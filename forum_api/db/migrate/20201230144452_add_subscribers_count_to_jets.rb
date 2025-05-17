# frozen_string_literal: true

class AddSubscribersCountToJets < ActiveRecord::Migration[5.2]
  def change
    add_column :jets, :subscribers_count, :integer, default: 0
  end
end
