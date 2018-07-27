class WelcomeController < ApplicationController
  def index
    projects = Project.all.where(published: true).order('weight asc')
    @highlighted_projects = projects.where(highlighted: true).limit(5)
    @projects = projects.where.not(id: @highlighted_projects.pluck(:id))
    @clients = Client.all.where(published: true).order('name asc')
  end
end
