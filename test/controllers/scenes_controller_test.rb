require "test_helper"

class ScenesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get scenes_index_url
    assert_response :success
  end

  test "should get new" do
    get scenes_new_url
    assert_response :success
  end

  test "should get edit" do
    get scenes_edit_url
    assert_response :success
  end
end
