Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    #match controller action
    get 'gifs/search', to: 'gifs#search_gifs'
    resources :favorites

  end
end
