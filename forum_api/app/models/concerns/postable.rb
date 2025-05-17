module Postable
  extend ActiveSupport::Concern

  included do 
    scope :fetch_texts_and_links, -> (jet) { (jet.texts + jet.links).sort_by do |post|
      [post.cached_votes_score, post.created_at]
    end.reverse! }

    def assign_deleted
      if self.voter_id.nil?
        self.voter_id = "[deleted]"
        self.body = "[deleted]"
      end
    end
  end 
end