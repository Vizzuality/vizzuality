class AddBlockTitleToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :block_title, :string
  end
end
