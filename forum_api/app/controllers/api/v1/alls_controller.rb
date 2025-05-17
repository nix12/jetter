# frozen_string_literal: true

class Api::V1::AllsController < ApplicationController
  def all
    @posts = (Text.all + Link.all).sort_by do |text|
      [text.cached_votes_score, text.created_at]
    end.reverse!

    render 'all/all.json.jbuilder', status: :ok
  end
end
