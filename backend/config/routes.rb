Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope 'api' do
    scope 'v1' do
      get 'dog/breeds', to: 'dogs#index'
      get 'dog/search', to: 'dogs#search'
      get 'dog/image', to: 'dogs#image'
      resources :favorites
    end
  end
end
