class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.string :jet_id
      t.string :voter_id

      t.timestamps
    end
    add_index :subscriptions, :voter_id
  end
end
