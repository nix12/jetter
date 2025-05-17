# frozen_string_literal: true

json.jet do
  json.posts @posts,
             :type,
             :ancestry,
             :body,
             :cached_votes_score,
             :comments_count,
             :created_at,
             :hash_id,
             :id,
             :jet_id,
             :title,
             :updated_at,
             :uri,
             :voter_id

  json.subscribers @jet,
                   :subscribers_count
end
