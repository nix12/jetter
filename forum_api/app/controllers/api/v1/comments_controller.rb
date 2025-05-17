# frozen_string_literal: true

class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, except: %i[create]

  def create
    if params[:comment][:parent_id]
      @parent = Comment.find_by(hash_id: params[:comment][:parent_id])
      @comment = @parent.children.new(comment_params)
      @comment.parent_id = @parent.hash_id
    else
      @comment = Comment.new(comment_params)
    end

    @comment.author = current_user

    if @comment.save
      @comment.upvote_by current_user
      render json: @comment, status: :created
    else
      render json: { errors: @comment.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update_attributes(comment_params)
      render json: @comment, status: :no_content
    else
      render json: { errors: @comment.errors }, status: :internal_server_error
    end
  end

  def destroy
    @comment.shadow_destroy if @comment.present?
  end

  def upvote
    @comment.upvote_by current_user
  end

  def downvote
    @comment.downvote_by current_user
  end

  def unvote
    @comment.unvote_by current_user
  end

  private

  def set_comment
    @comment = Comment.friendly.find(params[:hash_id])
  end

  def comment_params
    params.require(:comment).permit(:body, :post_id, :commentable_id, :commentable_type, :parent_id)
  end
end
