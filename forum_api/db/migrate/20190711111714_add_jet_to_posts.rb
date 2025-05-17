class AddJetToPosts < ActiveRecord::Migration[5.2]
  def change
    add_reference :posts, :jet, foreign_key: true
  end
end
