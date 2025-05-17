# frozen_string_literal: true

class Api::V1::SubscriptionsController < ApplicationController
  def index
    @subscriptions = current_user.subscriptions

    render json: { subscriptions: @subscriptions }, status: :ok
  end

  def create
    @subscription = Subscription.new(subscriptions_params)

    if @subscription.save
      render json: { subscription: @subscription }, status: :created
    else
      render json: { errors: @subscription.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @subscription = Subscription.where(voter: current_user, jet_id: params[:id]).first

    @subscription&.destroy if @subscription
  end

  private

  def subscriptions_params
    params.require(:subscription).permit(:voter_id, :jet_id)
  end
end
