class AboutController < ApplicationController
  def index
    @team_members = User.sorted_team
  end

  def show
    @team_member = User.friendly.find(params[:team_member_id])
    @prev_team_member = @team_member.prev
    @next_team_member = @team_member.next
  end
end
