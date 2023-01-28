class TweetsController < ApplicationController
    def index
        @tweets = Tweet.all
        render json: @tweets
    end

    def create
        @tweet = Tweet.new(tweet_params)
        @tweet.user = @current_user
        if @tweet.save
            redirect_to tweets_path
        else
            render :index
        end
    end

    def destroy
        @tweet = Tweet.find(params[:id])
        @tweet.destroy
        redirect_to tweets_path
    end

    private

    def tweet_params
        params.permit(:tweet)
    end
    
end
