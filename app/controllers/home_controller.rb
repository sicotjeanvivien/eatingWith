class HomeController < ApplicationController
  def index
    @cities = City.all
  end

  def search
    city = City.find_by(name: params["city_name"].to_s.downcase)
    if city
      @restaurants = Restaurant.where(city_id: city.id)  
    end
    render json: { restaurants: @restaurants, city: city }
  end
end
