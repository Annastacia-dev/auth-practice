class UserTweetsSerializer < ActiveModel::Serializer
  attributes :name, :username, :email, :bio, :avatar_url
  has_many :tweets
end
