class CommentsController < ApplicationController

  def create
    @restaurant = Restaurant.find(params[:restaurant_id])

    logger.debug ("un truc de ouf #{comment_params}")
    @comment = @restaurant.comments.create(comment_params)
    redirect_to restaurant_path(@restaurant)
  end

  # def destroy
  #   @restaurant = restaurant.find(params[:restaurant_id])
  #   @comment = @restaurant.comments.find(params[:id])
  #   @comment.destroy
  #   redirect_to restaurant_path(@restaurant), status: :see_other
  # end

  private
    def comment_params
      params.require(:comment).permit(:commenter, :comment, :note)
    end

end
