class SwitcherController < ApplicationController
  
  def index
    ActionCable.server.broadcast("change_viewer", { slug: params[:scene_slug] })
    render json: { }, status: :ok
  end
end
