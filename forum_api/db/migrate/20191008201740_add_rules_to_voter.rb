class AddRulesToVoter < ActiveRecord::Migration[5.2]
  def change
    add_column :voters, :rules, :text
  end
end
