class AddProjectIdToVideos < ActiveRecord::Migration[5.1]
  def change
    add_column :videos, :project_id, :integer
  end
end
