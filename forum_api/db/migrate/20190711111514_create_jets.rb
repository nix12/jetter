class CreateJets < ActiveRecord::Migration[5.2]
  def change
    create_table :jets do |t|
      t.string :name

      t.timestamps
    end
  end
end
