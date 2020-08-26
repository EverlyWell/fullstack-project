Rails.application.routes.draw do
  devise_for :users,
             path: 'api/v1/',
             path_names: {
                 sign_in: 'login',
                 sign_out: 'logout'
             }

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
      namespace :v1 do
        get '/images/search/', to: 'images#search'

        resource :favorites do
        end
      end
  end
end
