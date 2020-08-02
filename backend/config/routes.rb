Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get 'images', to: 'images#index'
      post 'authenticate', to: 'authentication#authenticate'
      post 'register', to: 'authentication#register'
      resources :favorites, only: %i[index create destroy]
    end
  end
end
