class CreateScenes < ActiveRecord::Migration[7.1]
  def change
    create_table :scenes do |t|
      t.string :title
      t.string :slug

      t.timestamps
    end
  end
end
