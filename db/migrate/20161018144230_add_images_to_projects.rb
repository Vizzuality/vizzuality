class AddImagesToProjects < ActiveRecord::Migration[5.1]
  def up
    add_attachment :projects, :cover_image
    add_attachment :projects, :project_logo
    add_attachment :projects, :project_image
  end
end
