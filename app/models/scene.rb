# == Schema Information
#
# Table name: scenes
#
#  id         :integer          not null, primary key
#  title      :string
#  slug       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Scene < ApplicationRecord
  has_many :layers, dependent: :destroy

  accepts_nested_attributes_for :layers, allow_destroy: true, reject_if: :all_blank
end
