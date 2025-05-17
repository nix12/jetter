# frozen_string_literal: true

class Subscription < ApplicationRecord
  belongs_to :voter
  belongs_to :jet, counter_cache: :subscribers_count

  validates :voter_id, presence: true
  validates :jet_id, presence: true

  validates_uniqueness_of :voter_id, scope: :jet_id
end
