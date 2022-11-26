class ApplicationController < ActionController::API
    include ActionController::Cookies

    before_action :authorize

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    
    private

    def authorize 
        @current_user = User.find(session[:user_id])
        render json: { errors: ['unauthorized'] }, status: :unauthorized unless @current_user 
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { errors: ["User Not Found"] }, status: :not_found
    end


end
