class HomeController < ApplicationController
  def index
    @cities = City.all
  end

  def search
    city = City.find_by("name = :name", { name: params["city_name"].to_s.downcase })
    if city
      @restaurants = Restaurant.joins(:city).where("city_id = :city", { city: city.id })
    end
    render layout: false, template: "/restaurants/_list"
  end
end
