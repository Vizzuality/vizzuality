class AddProjectIdToMaps < ActiveRecord::Migration[5.1]
  def change
    add_column :maps, :project_id, :integer
  end
end
