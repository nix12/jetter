# frozen_string_literal: true

require 'api_constraints'

Rails.application.routes.draw do
  # Use for login and authorize all resource
  use_doorkeeper

  scope module: :api, defaults: { format: :json }, path: 'api' do
    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: true) do
      devise_for :users, controllers: {
        registrations: 'api/v1/users/registrations'
      }, skip: %i[sessions password]
    end
  end
end
