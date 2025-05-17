# frozen_string_literal: true

json.upvoted_posts @voter.find_up_voted_items do |post|
  json.hash_id post.hash_id unless post.nil?
end
