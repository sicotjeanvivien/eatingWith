class RestaurantsController < ApplicationController
  def index
    @restaurant = Restaurant.all
  end

  def show
    @restaurant = Restaurant.find(params[:id])
    @comments = Comment.all
  end

  def new
    self::user_is_connect
    @restaurant = Restaurant.new
  end

  def create
    self::user_is_connect
    @restaurant = Restaurant.new(restaurant_params)
    if @restaurant.save
      redirect_to ""
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    self::user_is_connect
    @restaurant = Restaurant.find(params[:id])
  end

  def update
    self::user_is_connect
    @restaurant = Restaurant.find(params[:id])

    if @restaurant.update(restaurant_params)
      redirect_to @restaurant
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    self::user_is_connect
    @restaurant = Restaurant.find(params[:id])
    @restaurant.destroy

    render json: [error: true, message: "<div class='alert alert-danger' role='alert'>Error server </div>"]
  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :description, :city_id, :latitude, :longitude)
  end
end
