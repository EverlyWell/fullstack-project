Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :dogs, only: [:index]
    get "/favorite", to: "dogs#favorite"
    get "/favorites", to: "dogs#user_favorites"

    resource :users, only: [:create] do
      post "/login", to: "users#login", as: :login
    end
  end
end
