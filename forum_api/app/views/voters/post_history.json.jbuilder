# frozen_string_literal: true

json.history @voter.find_voted_items.compact do |post|
  json.type post.type if post.respond_to?(:type)
  json.ancestry post.ancestry
  json.body post.body
  json.cached_votes_score post.cached_votes_score
  json.comments_count post.comments_count if post.respond_to?(:type)
  json.created_at post.created_at
  json.hash_id post.hash_id
  json.id post.id
  json.jet_id post.jet_id if post.respond_to?(:jet_id)
  json.title post.title if post.respond_to?(:title)
  json.updated_at post.updated_at
  json.uri post.uri if post.respond_to?(:uri)
  json.voter_id post.voter_id
end
