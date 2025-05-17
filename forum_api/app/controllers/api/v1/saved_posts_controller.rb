# frozen_string_literal: true

class Api::V1::SavedPostsController < ApplicationController
  def index
    @saved_posts = current_user.saved_posts

    render 'saved_posts/index.json.jbuilder', status: :ok
  end

  def create
    @saved_post = SavedPost.new(saved_post_params)

    if @saved_post.save
      render 'saved_posts/create.json.jbuilder', status: :created
    else
      render json: { errors: @saved_post.errors }
    end
  end

  def show
    @saved_post = SavedPost.where(voter_id: params[:voter_id], post_id: params[:post_id]).last

    render json: { saved_post: @saved_post }, status: :ok
  end

  def destroy
    @saved_post = current_user.saved_posts.find(params[:id])
    @saved_post&.destroy if @saved_post
  end

  private

  def saved_post_params
    params.require(:saved_post).permit(:post_id, :voter_id)
  end
end
