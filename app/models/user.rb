class User < ApplicationRecord

    # username should be present, unique, allow only letters, numbers, and underscores, and be between 3 and 20 characters long
    
    validates :username, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9_]{3,20}\z/ }

    # password should be present, must be at least 6 characters lond, include at least one number, one special character, and one uppercase letter

    validates :password, presence: true, length: { minimum: 6 }, format: { with: /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+\z/ }

    has_secure_password



end
