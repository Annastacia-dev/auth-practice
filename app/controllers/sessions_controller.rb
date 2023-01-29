class SessionsController < ApplicationController

    skip_before_action :authorize, only: :create

    def create
        user = User.find_by(username: params[:username]) || User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else
            render json: { errors: ["Invalid username, email or password"] }, status: :unauthorized
        end
    end

    def omniauth
        user = User.find_or_create_by(uid: request.env['omniauth.auth']['uid'], provider: request.env['omniauth.auth']['provider']) do |u|
            u.username = request.env['omniauth.auth']['info']['name']
            u.email = request.env['omniauth.auth']['info']['email']
            u.password = SecureRandom.hex(10)
            u.avatar_url = request.env['omniauth.auth']['info']['image']
        end
        if user.valid?
            session[:user_id] = user.id
            render json: user
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    

    def destroy
        session.delete :user_id
        head :no_content
    end


end
