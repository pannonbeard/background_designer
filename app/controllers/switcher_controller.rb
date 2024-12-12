class SwitcherController < ApplicationController
  
  def index
    ActiveStorage::Current.url_options = Rails.env.development? ? { host: 'localhost', port: 3000 } : { host: '192.168.68.112', port: 80 }
    @scene = Scene.find_by(slug: params[:scene_slug])
    @html_string = render_to_string('viewer/index', layout: false)
    ActionCable.server.broadcast("change_viewer", { slug: params[:scene_slug], html: @html_string })
    render json: { }, status: :ok
  end
end
