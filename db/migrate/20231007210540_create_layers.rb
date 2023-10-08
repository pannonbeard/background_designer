class CreateLayers < ActiveRecord::Migration[7.1]
  def change
    create_table :layers do |t|
      t.belongs_to :scene, null: false, foreign_key: true
      t.boolean :stack
      t.timestamps
    end
  end
end
