# frozen_string_literal: true

class Api::V1::JetsController < ApplicationController
  before_action :set_jet, except: %i[index create]
  before_action :update_rules, only: %i[create show]

  def index
    @jets = Jet.all

    render 'jets/index.json.jbuilder', status: :ok
  end

  def create
    @jet = Jet.new(jet_params)
    @jet.owner = current_user

    if @jet.save
      render 'jets/create.json.jbuilder', status: :created
    else
      render 'jets/error.json.jbuilder', status: :unprocessable_entity
    end
  end

  def show
    @jet = Jet.friendly.find(params[:id])
    @posts = Post.fetch_texts_and_links(@jet)

    render 'jets/show.json.jbuilder', status: :ok
  end

  private

  def set_jet
    @jet = Jet.friendly.find(params[:id])
  end

  def jet_params
    params.require(:jet).permit(:name, :description)
  end
end
