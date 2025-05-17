# frozen_string_literal: true

require 'jwt'
require 'json'

class ApplicationController < ActionController::API
  def access_token
    token = nil

    unless request.headers['HTTP_ACCESS_TOKEN'].blank?
      token = JWT.decode(
        request.headers['HTTP_ACCESS_TOKEN'],
        Rails.application.credentials.jwt_secret,
        true,
        algorithm: 'HS512'
      )[0]
    end

    token
  end

  def current_user
    data = access_token

    @current_user = data ? Voter.find_or_create_by(username: data['user']['username']) : nil
  end

  def update_rules
    data = access_token

    current_user&.update(rules: data['user']['rules'].to_json)
  end
end
