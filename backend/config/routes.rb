# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :users, only: [:create] do
      post :login, on: :collection
    end

    resources :images, only: [] do
      get :search, on: :collection
    end

    resources :favorites, only: %i[index create destroy]
  end
end
