class UserController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if user_params["password"] == params["confirm_password"]
      if @user.save
        session[:user_id] = @user.id
        redirect_to root_path
      else
        flash.now[:notice] = @user.errors.full_messages.to_sentence
        render :new
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
