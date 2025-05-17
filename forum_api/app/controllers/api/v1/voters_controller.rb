# frozen_string_literal: true

class Api::V1::VotersController < ApplicationController
  before_action :set_voter, only: %i[show upvoted downvoted post_history]

  def show
    render json: @voter, status: :ok
  end

  def upvoted
    render 'voters/upvoted.json.jbuilder', status: :ok
  end

  def downvoted
    render 'voters/downvoted.json.jbuilder', status: :ok
  end

  def post_history
    render 'voters/post_history.json.jbuilder', status: :ok
  end

  def saved_items
    @saved_posts = current_user.saved_posts
    @saved_comments = current_user.saved_comments

    @saved_items = (@saved_posts + @saved_comments).sort_by do |item|
      [item.created_at]
    end.reverse!

    @transformed_items = @saved_items.map do |saved|
      save = if saved.respond_to?(:post)
               saved.post
             else
               saved.comment
             end

      save
    end

    render json: { saved_items: @transformed_items }, status: :ok
  end

  private

  def set_voter
    @voter = Voter.find(params[:username])
  end
end
