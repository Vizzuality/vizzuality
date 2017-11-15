# == Schema Information
#
# Table name: videos
#
#  id         :integer          not null, primary key
#  title      :string
#  style      :string
#  url        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  project_id :integer
#

class Video < ApplicationRecord
  belongs_to :project
end
