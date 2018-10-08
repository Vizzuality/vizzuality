class ProjectsController < ApplicationController
  def show
    @project = Project.friendly.find(params[:id])
    @next_project = @project.next if @project.present?
  end
end
