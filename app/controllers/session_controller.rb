class SessionController < ApplicationController
  def new
    @user = User.new
  end

  def sign_in
    # lookup the user in the database
    @user = User.find_by(username: user_params[:username])

    if @user.present? && @user.authenticate(user_params[:password])
      session[:user_id] = @user.id
      redirect_to root_path
    else
      flash.now[:notice] = "Invalid username or password"
    end
  end

  def sign_out
    session[:user_id] = nil
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
