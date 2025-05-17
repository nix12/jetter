# frozen_string_literal: true

require 'api_constraints'

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope module: :api, defaults: { format: :json }, path: 'api' do
    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: true) do
      resources :jets, only: %i[index create update show] do
        resources :texts, controller: :posts, type: 'Text', param: :hash_id, only: %i[create update show destroy] do
          member do
            put 'upvote', to: 'posts#upvote'
            put 'downvote', to: 'posts#downvote'
            put 'unvote', to: 'posts#unvote'
          end

          resources :comments, param: :hash_id, only: %i[create update destroy] do
            member do
              put 'upvote', to: 'comments#upvote'
              put 'downvote', to: 'comments#downvote'
              put 'unvote', to: 'comments#unvote'
            end
          end
        end

        resources :links, controller: :posts, type: 'Link', param: :hash_id, only: %i[create update show destroy] do
          member do
            put 'upvote', to: 'posts#upvote'
            put 'downvote', to: 'posts#downvote'
            put 'unvote', to: 'posts#unvote'
          end

          resources :comments, param: :hash_id, only: %i[create update destroy] do
            member do
              put 'upvote', to: 'comments#upvote'
              put 'downvote', to: 'comments#downvote'
              put 'unvote', to: 'comments#unvote'
            end
          end
        end
      end

      resources :voters, param: :username, only: [:show] do
        member do
          get 'upvoted', to: 'voters#upvoted'
          get 'downvoted', to: 'voters#downvoted'
          get 'post_history', to: 'voters#post_history'
          get 'saved_items', to: 'voters#saved_items'
        end

        resources :saved_posts, only: %i[index create show destroy]
        resources :saved_comments, only: %i[index create show destroy]
      end

      resources :subscriptions, only: %i[index create destroy]
      get 'all', to: 'alls#all'
    end
  end
end
