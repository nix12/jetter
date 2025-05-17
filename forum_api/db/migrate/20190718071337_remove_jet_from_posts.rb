class RemoveJetFromPosts < ActiveRecord::Migration[5.2]
  def change
    remove_reference :posts, :jet, foreign_key: true
  end
end
