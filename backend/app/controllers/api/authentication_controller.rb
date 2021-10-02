class Api::AuthenticationController < ApplicationController
    before_action :authorize_request, except: :login_or_create
    # POST /auth/login
    def login_or_create
        user = User.find_by_username(params[:username])
        if !user
            @user = User.new(login_params)
            @user.cat_api_sub_id = "demo-xas24t51_#{@user.username}"
    
            if @user.save
            token = JsonWebToken.encode(user_id: @user.id)
            time = Time.now + 24.hours.to_i
            render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                            username: @user.username, cat_api_sub_id: @user.cat_api_sub_id }, status: :ok
            else
            render json: { errors: @user.errors.full_messages },
                    status: :unprocessable_entity
            end
        elsif user&.authenticate(params[:password])
            token = JsonWebToken.encode(user_id: user.id)
            time = Time.now + 24.hours.to_i
            render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                            username: user.username, cat_api_sub_id: user.cat_api_sub_id }, status: :ok
        else
            render json: { error: 'unauthorized' }, status: :unauthorized
        end
    end

    def login_params
        params.permit(:username, :password)
    end  
end

