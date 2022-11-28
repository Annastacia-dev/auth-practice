class PasswordResetsController < ApplicationController
    skip_before_action :authorize, only: [:create, :update]

    def create
        @user = User.find_by(email: params[:email])
        if @user
            @user.generate_password_token!
            PasswordMailer.with(user: @user).reset.deliver_now
            head :ok
        else
            head :not_found
        end
    end

    def update
        @user = User.find_by(reset_password_token: params[:token])
        if @user&.password_token_valid?
            @user.update!(password: params[:password], reset_password_token: nil)
            head :ok
        else
            head :not_found
        end
    end
end
