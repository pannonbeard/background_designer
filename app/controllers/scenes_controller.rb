class ScenesController < ApplicationController
  def index
    @scenes = Scene.all
  end

  def new
    @scene = Scene.new
  end

  def create
    @scene = Scene.new(scene_params)

    @scene.save

    redirect_to scenes_path
  end

  def edit
    @scene = Scene.find(params[:id])
  end

  def update
    @scene = Scene.find(params[:id])
    @scene.update(scene_params)

    redirect_to scenes_path
  end

  def delete
    @scene = Scene.find(params[:id])
    @scene.destroy

    redirect_to scenes_path
  end

  private

  def scene_params
    params.require(:scene).permit(:slug, :title, layers_attributes: {})
  end
end
