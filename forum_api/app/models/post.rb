# frozen_string_literal: true

class Post < ApplicationRecord
  include Friendlyable
  include Postable

  self.primary_key = 'hash_id'

  has_many :saved_posts
  has_many :voters, through: :saved_posts, source: :voters

  scope :texts, -> { where(type: 'Text') }
  scope :links, -> { where(type: 'Link') }
end
