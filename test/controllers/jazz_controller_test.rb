require 'test_helper'

class JazzControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get jazz_index_url
    assert_response :success
  end

end
