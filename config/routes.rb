Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"
  get "/search", to: "home#search"

  # Restaurants
  resources :restaurants do
    resources :comments
  end

  # City


end
