class AddPostTitleToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :post_title, :string
  end
end
