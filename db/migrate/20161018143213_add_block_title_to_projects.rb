class AddBlockTitleToProjects < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :block_title, :string
  end
end
