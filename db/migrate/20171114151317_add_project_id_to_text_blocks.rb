class AddProjectIdToTextBlocks < ActiveRecord::Migration[5.1]
  def change
    add_column :text_blocks, :project_id, :integer
  end
end
