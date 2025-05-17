# frozen_string_literal: true

class SavedComment < ApplicationRecord
  belongs_to :voter
  belongs_to :comment

  validates :voter_id, presence: true
  validates :comment_id, presence: true
end
