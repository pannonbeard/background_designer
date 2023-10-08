class ViewerController < ApplicationController
  include ActiveStorage::SetCurrent
  
  def index
    @scenes = Scene.all

    @scene = params[:scene].present? ? Scene.find_by(slug: params[:scene]) : Scene.first
  end
end
