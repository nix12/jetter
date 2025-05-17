require 'rails_helper'

RSpec.describe 'Users', type: :request do
  let(:application) { create :application }
  let(:json_response) { JSON.parse(response.body) }

  before(:all) { create(:role, :member) }

  describe 'POST /oauth/token' do
    let(:user) { create(:user) }
    let(:params) do
      {
        client_id: application.uid,
        client_secret: application.secret,
        grant_type: 'password',
        username: user.username,
        password: user.password
      }
    end

    before(:each) do
      post '/oauth/token', params: params
    end

    it 'should respond with 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'should return json response' do
      expect(json_response).to have_key('access_token')
      expect(json_response).to have_key('user')
    end
  end

  describe 'POST /oauth/revoke' do
    let(:params) do
      {
        client_id: application.uid,
        client_secret: application.secret,
        grant_type: 'password'
      }
    end

    before(:each) do
      post '/oauth/revoke', params: params
    end

    it 'should respond with 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'should return json response' do
      expect(json_response).not_to have_key('access_token')
      expect(json_response).not_to have_key('user')
    end
  end

  describe 'POST /api/users' do
    let(:user) { create(:user) }
    let(:params) do
      {
        user: {
          username: 'test',
          password: 'password',
          password_confirmation: 'password'
        }   
      }
    end

    before(:each) do
      post '/api/users', params: params
    end

    it 'should respond with 201' do
      expect(response).to have_http_status(:created)
    end

    it 'should return json response' do
      expect(json_response).to include_json(username: params[:user][:username])
    end
  end

  describe 'PUT /api/users' do 
    let(:user) { create(:user) }
    let(:token) { create :access_token, resource_owner_id: user.id }
    let(:params) do
      {
        access_token: token.token,
        user: {
					username: user.username,
          current_password: user.password,
          password: 'newpassword',
          password_confirmation: 'newpassword'
        }
      }
    end

    before(:each) do
      put '/api/users', params: params
      user.reload
    end

    it 'should return 204' do
      expect(response).to have_http_status(:no_content)
    end

    it 'should get token with new password' do
      credentials = {
        client_id: application.uid,
        client_secret: application.secret,
        grant_type: 'password',
        username: user.username,
        password: 'newpassword'
      }

      post '/oauth/token', params: credentials

      expect(response).to have_http_status(:ok)
    end
  end

  describe 'PATCH /api/users' do 
    let(:user) { create(:user) }
    let(:token) { create :access_token, resource_owner_id: user.id }
    let(:params) do
      {
        access_token: token.token,
        user: {
					username: user.username,
          current_password: user.password,
          password: 'newpassword',
          password_confirmation: 'newpassword'
        }
      }
    end

    before(:each) do
      patch '/api/users', params: params
      user.reload
    end

    it 'should return 204' do
      expect(response).to have_http_status(:no_content)
    end

    it 'should get token with new password' do
      credentials = {
        client_id: application.uid,
        client_secret: application.secret,
        grant_type: 'password',
        username: user.username,
        password: 'newpassword'
      }

      post '/oauth/token', params: credentials

      expect(response).to have_http_status(:ok)
    end
  end

  describe 'DELETE /api/users' do
    let(:user) { create(:user) }
    let(:token) { create :access_token, resource_owner_id: user.id }
    let(:params) do
      {
        access_token: token.token,
        user: {
          current_password: user.password,
          password: 'newpassword',
          password_confirmation: 'newpassword'
        }
      }
    end

    before(:each) do
      delete '/api/users', params: params
    end

    it 'should return 204' do
      expect(response).to have_http_status(:no_content)
    end

    it 'should fail to get a new token' do
      credentials = {
        client_id: application.uid,
        client_secret: application.secret,
        grant_type: 'password',
        username: user.username,
        password: 'newpassword'
      }

      post '/oauth/token', params: credentials

      expect(response).to have_http_status(:bad_request)
    end
  end
end
