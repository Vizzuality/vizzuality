class ProjectsController < ApplicationController
  def show
    @project = Project.friendly.find(params[:id])
  end
end
