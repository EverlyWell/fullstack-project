Rails.application.routes.draw do
  resources :favorites
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get 'images/search', to: 'images#search'
      post 'favorites', to: 'favorites#create'
      get 'favorites', to: 'favorites#index'
      post 'favorites/delete', to: 'favorites#delete'
    end
  end
end
