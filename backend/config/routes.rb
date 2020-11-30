Rails.application.routes.draw do
  resources :favorites
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
  end
end
