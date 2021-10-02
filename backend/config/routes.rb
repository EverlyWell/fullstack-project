Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    post '/auth/login', to: 'authentication#login_or_create'
    get '/*a', to: 'application#not_found'     
  end
end
