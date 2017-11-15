# == Schema Information
#
# Table name: maps
#
#  id          :integer          not null, primary key
#  title       :string
#  url         :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  project_id  :integer
#

class Map < ApplicationRecord
  belongs_to :project
end
