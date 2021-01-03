Rails.application.routes.draw do
  resources :favorites
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get 'images/search', to: 'images#search'
      post 'favorites', to: 'favorites#create'
      get 'favorites', to: 'favorites#index'
      post 'favorites/delete', to: 'favorites#delete'
      post 'register', to: 'users#create'
      post 'login', to: "users#login"
      get 'authenticate', to: "users#authenticate"
    end
  end
end
