class RemoveBlockTitleFromProjects < ActiveRecord::Migration[5.1]
  def change
    remove_column :projects, :block_title
  end
end
