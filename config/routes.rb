Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'pages#home'

  # protects react routing
  get '/posts/new', to: 'pages#home'
  get '/posts/:id', to: 'pages#home'

  # API
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :posts, only: [ :index, :show, :create ] 
    end
  end
end
