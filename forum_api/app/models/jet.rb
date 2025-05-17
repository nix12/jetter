# frozen_string_literal: true

class Jet < ApplicationRecord
  extend FriendlyId

  friendly_id :name, use: :slugged
  self.primary_key = :name

  has_many :texts, class_name: 'Text', primary_key: 'slug', foreign_key: 'jet_id'
  has_many :links, class_name: 'Link', primary_key: 'slug', foreign_key: 'jet_id'
  has_many :subscribers, class_name: 'Subscription'
  has_many :voters, through: :subscriptions
  belongs_to :owner, class_name: 'Voter', foreign_key: 'voter_id'

  validates :name, presence: true, length: { minimum: 3, maximum: 10 },
                   uniqueness: true
end
