class AboutController < ApplicationController
  def index
    @team_members = User.sorted_team
    placeholders_size = 4 - (@team_members.size % 4)
    if placeholders_size <= 3 && placeholders_size.positive?
      @placeholders = ['bici', 'pc', 'ventilador', 'gnome', 'cabage', 'cambridge'][0..(placeholders_size - 1)]
    end
  end

  def show
    @team_member = User.friendly.find(params[:team_member_id])
    @prev_team_member = @team_member.prev
    @next_team_member = @team_member.next
  end
end
