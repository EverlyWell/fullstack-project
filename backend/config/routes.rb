Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    get 'gifs/search', to: 'gif#search'
    resources :favorites

  end
end
