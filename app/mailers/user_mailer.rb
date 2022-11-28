class UserMailer < ApplicationMailer

    def forgot_password(user)
        @user = user
        mail(to: @user.email, subject: 'Reset your password')
    end

    mail(to: @user.email, subject: 'Reset your password')

end