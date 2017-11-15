class AddAuthorToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :author, :string
  end
end
