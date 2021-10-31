Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :authentication do
        collection do
          post :signin
          post :signup
        end
      end

      resources :cats, only: [:index]
      resources :categories, only: [:index]
      resources :favorites, only: [:index, :create, :destroy]
    end
  end

  scope 'health', as: 'health', defaults: { format: :json } do
    get 'ping',    to: 'health#show',    as: :ping
    get 'live',    to: 'health#live',    as: :live
    get 'ready',   to: 'health#ready',   as: :ready
    get 'version', to: 'health#version', as: :version
  end

  root 'health#show'
end
