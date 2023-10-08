# == Schema Information
#
# Table name: layers
#
#  id         :integer          not null, primary key
#  scene_id   :integer          not null
#  stack      :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Layer < ApplicationRecord
  belongs_to :scene

  has_one_attached :asset
end
