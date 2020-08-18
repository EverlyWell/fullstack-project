Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :cats, format: 'json' do
        collection do
          get 'breeds'
          get 'categories'
          get 'search'
          get 'favorites'
          get 'search_by_breed'
        end
      end
    end
  end
end
