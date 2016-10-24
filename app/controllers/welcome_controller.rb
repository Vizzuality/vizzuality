class WelcomeController < ApplicationController
  def index
    projects = Project.all.where(published: true).order('weight asc')
    @highlighted_projects = projects.where(highlighted: true)
    @projects = projects.where(highlighted: false)
    @clients = Client.all.where(published: true).order('name asc')
  end
end
