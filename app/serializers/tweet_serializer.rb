class TweetSerializer < ActiveModel::Serializer
  attributes :id, :tweet
  belongs_to :user

end
