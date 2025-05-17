# frozen_string_literal: true

json.post @post,
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

json.comments nested_comments(@post)
