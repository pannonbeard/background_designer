class ScenesController < ApplicationController
  include ActiveStorage::SetCurrent
  
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

  def destroy
    @scene = Scene.find(params[:id])
    @scene.destroy

    redirect_to scenes_path
  end

  def duplicate
    @scene = Scene.find(params[:id])
    @duplicate_scene = @scene.dup
    @duplicate_scene.title += " (Copy)"
    @duplicate_scene.save

    @scene.layers.each do |layer|
      layer_dup = layer.dup
      @duplicate_scene.layers << layer_dup

      if layer.asset.present?
        layer_dup.asset.attach layer.asset.blob
      end
    end

    redirect_to scenes_path
  end

  private

  def scene_params
    params.require(:scene).permit(:slug, :title, layers_attributes: [:id, :_destroy, :asset, :stack])
  end
end
