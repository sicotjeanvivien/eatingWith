Rails.application.routes.draw do

  #User
  get '/user/new', to: "user#new"
  post "/user", to:  "user#create"
  
  post "/sign_in", to:  "session#sign_in"
  get '/sign_out', to: 'session#sign_out'

  # Defines the root path route ("/")
  root "home#index"
  get "/search", to: "home#search"

  # Restaurants
  resources :restaurants do
    resources :comments
  end

  # City


end
