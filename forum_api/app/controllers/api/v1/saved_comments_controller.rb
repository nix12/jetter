# frozen_string_literal: true

class Api::V1::SavedCommentsController < ApplicationController
  def index
    @saved_comments = current_user.saved_comments

    render 'saved_comments/index.json.jbuilder', status: :ok
  end

  def create
    @saved_comment = SavedComment.new(saved_comment_params)

    if @saved_comment.save
      render 'saved_comments/create.json.jbuilder', status: :created
    else
      render json: { errors: @saved_comment.errors }
    end
  end

  def show
    @saved_comment = SavedComment.where(voter_id: params[:voter_id], comment_id: params[:comment_id]).first

    render json: { saved_comment: @saved_comment }, status: :ok
  end

  def destroy
    @saved_comment = current_user.saved_comments.find(params[:id])
    @saved_comment.destroy if @saved_comment.present?
  end

  private

  def saved_comment_params
    params.require(:saved_comment).permit(:comment_id, :voter_id)
  end
end
