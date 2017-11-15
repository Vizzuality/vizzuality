class AddProjectShortUrlToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :project_short_url, :string
  end
end
