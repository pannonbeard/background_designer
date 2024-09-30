# == Schema Information
#
# Table name: layers
#
#  id         :integer          not null, primary key
#  scene_id   :integer          not null
#  stack      :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class LayerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
