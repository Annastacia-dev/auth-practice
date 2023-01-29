class TweetsController < ApplicationController
    def index
        @tweets = Tweet.all
        render json: @tweets
    end

    def create
        @tweet = Tweet.new(tweet_params)
        @tweet.user = @current_user
        if @tweet.save
            render json: @tweet
        else
            render json: {error: "Tweet not saved"}
        end
    end

    def destroy
        @tweet = Tweet.find(params[:id])
        @tweet.destroy
        render json: {message: "Tweet deleted"}
    end

    private

    def tweet_params
        params.permit(:tweet)
    end
    
end
