Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :cats, only: [:index]
      resources :categories, only: [:index]
      resources :favourites, only: [:index, :create, :destroy]
    end
  end
end
