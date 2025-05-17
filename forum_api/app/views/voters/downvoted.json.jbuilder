# frozen_string_literal: true

json.downvoted_posts @voter.find_down_voted_items do |post|
  json.hash_id post.hash_id unless post.nil?
end
