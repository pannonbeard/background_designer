class SwitcherController < ApplicationController
  
  def index
    ActiveStorage::Current.url_options = { host: 'localhost', port: 3000 }
    @scene = Scene.find_by(slug: params[:scene_slug])
    @html_string = render_to_string('viewer/index', layout: false)
    ActionCable.server.broadcast("change_viewer", { slug: params[:scene_slug], html: @html_string })
    render json: { }, status: :ok
  end
end
