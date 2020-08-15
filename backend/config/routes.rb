Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, constraints: { format: 'json' } do
    resources 'images',  defaults: { format: :json }
    resources 'favorite', defaults: { format: :json }
    post 'user_token' => 'user_token#create'
  end
end
