class UsersController < ApplicationController

    skip_before_action :authorize, only: :create

    def create
        @user = User.create!(user_params)
        session[:user_id] = @user.id
        render json: @user, status: :created
    end

    def show
        render json: @current_user, serializer: UserTweetsSerializer
    end

    def update
        @current_user.update!(user_params)
        render json: @current_user
    end

    private

    def user_params
        params.permit( :email, :username, :password, :password_confirmation, :avatar_url, :bio, :name)
    end

end
