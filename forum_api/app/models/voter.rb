# frozen_string_literal: true

class Voter < ApplicationRecord
  before_save { username.downcase! }

  self.primary_key = 'username'

  has_many :texts, inverse_of: 'author'
  has_many :links, inverse_of: 'author'
  has_many :comments, inverse_of: 'author'
  has_many :jets, inverse_of: 'owner'
  has_many :saved_posts
  has_many :posts, through: :saved_posts, source: :posts
  has_many :saved_comments
  has_many :comments, through: :saved_comments, source: :comments
  has_many :subscriptions
  has_many :jets, through: :subscriptions

  validates :username, uniqueness: true, length: { minimum: 3, maximum: 10 } if :not_deleted_or_removed

  acts_as_voter

  private

  def not_deleted_or_removed
    username != '[deleted]' ||
      username != '[removed]' ||
      username != 'deleted'   ||
      username != 'removed'
  end
end
