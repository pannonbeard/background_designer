class AddStackToScenes < ActiveRecord::Migration[7.1]
  def change
    change_column :layers, :stack, :integer
  end
end
