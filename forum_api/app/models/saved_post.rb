# frozen_string_literal: true

class SavedPost < ApplicationRecord
  belongs_to :voter
  belongs_to :post

  validates :voter_id, presence: true
  validates :post_id, presence: true
end
