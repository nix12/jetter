class AddVoterToPosts < ActiveRecord::Migration[5.2]
  def change
    add_reference :posts, :voter, foreign_key: true
  end
end
