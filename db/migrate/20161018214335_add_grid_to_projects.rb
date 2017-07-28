class AddGridToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :grid, :integer
  end
end
