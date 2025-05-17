class AddSlugToJets < ActiveRecord::Migration[5.2]
  def change
    add_column :jets, :slug, :string
    add_index :jets, :slug, unique: true
  end
end
