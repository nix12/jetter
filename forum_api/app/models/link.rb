# frozen_string_literal: true

class Link < Post
  include Friendlyable
  include Postable

  after_find do |_text|
    assign_deleted
  end

  self.primary_key = 'hash_id'

  belongs_to :jet, primary_key: 'slug'
  belongs_to :author, class_name: 'Voter', foreign_key: 'voter_id'
  has_many :comments, -> { order(cached_votes_score: :desc) }, as: :commentable

  serialize :rules, Hash

  validates :title, presence: true, length: { minimum: 1, maximum: 100 }
  validates :uri, presence: true, length: { minimum: 1, maximum: 300 }
  validates :type, presence: true
  validates :author, presence: true
  validates :jet_id, presence: true

  has_ancestry
  acts_as_votable
end
