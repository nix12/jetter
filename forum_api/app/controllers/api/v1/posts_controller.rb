# frozen_string_literal: true

class Api::V1::PostsController < ApplicationController
  before_action :set_post, except: %i[index create show]
  before_action :update_rules, only: %i[create show]

  def index
    @posts = Post.all

    render 'posts/index.json.jbuilder', status: :ok
  end

  def create
    @post = Post.send(set_type.pluralize).new(post_params)
    @post.author = current_user

    if @post.save
      @post.upvote_by current_user
      render 'posts/create.json.jbuilder', status: :created
    else
      render 'posts/error.json.jbuilder', status: :unprocessable_entity
    end
  end

  def show
    @post = Post.friendly.find(params[:hash_id])

    render 'posts/show.json.jbuilder', status: :ok
  end

  def update
    if @post.send(set_type.pluralize).update!(text_params)
      render 'posts/update.json.jbuilder', status: :no_content
    else
      render 'posts/error.json.jbuilder', status: :internal_server_error
    end
  end

  def destroy
    @post.shadow_destroy if @post.present?
  end

  def upvote
    @post.upvote_by current_user
  end

  def downvote
    @post.downvote_by current_user
  end

  def unvote
    @post.unvote_by current_user
  end

  private

  def set_post
    @post = Post.friendly.find(params[:hash_id])
  end

  def set_type
    case params[:type]
    when 'Text'
      'text'
    when 'Link'
      'link'
    end
  end

  def post_params
    params.require(:post).permit(:title, :body, :uri, :type, :jet_id)
  end

  def nested_comments(post)
    comments = []

    post.comments.map do |comments_branch|
      comments << comments_branch.subtree.arrange_serializable(order: :cached_votes_score)
    end

    comments
  end
  helper_method :nested_comments
end
