class AboutController < ApplicationController
  def index
    @team_members = User.all.where(published: true).order('weight asc')
  end

  def show
    @team_member = User.friendly.find(params[:team_member_id])
    @prev_team_member = @team_member.prev
    @next_team_member = @team_member.next
  end
end
