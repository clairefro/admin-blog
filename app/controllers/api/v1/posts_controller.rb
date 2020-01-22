# change default super class "ApplicationController" to "ActionController"
class Api::V1::PostsController < ActionController::Base
  skip_before_action :verify_authenticity_token
  # can use local variables bc there is no view file
  def index
    posts = Post.all
    # send posts as json
    render json: posts
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end

  def create
    post = Post.create(post_params)
    pp post
    render json: post
  end

  private
  def post_params
    params.require(:post).permit(:title, :content)
  end
end
