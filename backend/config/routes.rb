Rails.application.routes.draw do

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope 'api' do
    scope 'v1' do
      resources :favorites
    end
  end
end
