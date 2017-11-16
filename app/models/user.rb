# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  name                   :string
#  position               :string
#  quote                  :string
#  twitter_user           :string
#  linkedin_user          :string
#  dribbble_user          :string
#  github_user            :string
#  weight                 :integer          default(0)
#  body                   :text
#  published              :boolean          default(FALSE)
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  photo_file_name        :string
#  photo_content_type     :string
#  photo_file_size        :integer
#  photo_updated_at       :datetime
#  birthday               :date
#  admin                  :boolean          default(FALSE)
#  slug                   :string
#  alias                  :string
#  vizzday                :date
#

class User < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  acts_as_list column: :weight

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable

  has_attached_file :photo,
    styles: { medium: "512x512>", thumb: "70x70>" },
    default_url: ActionController::Base.helpers.image_path('missing.png')

  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\z/
  validates :name, :email, presence: true
  validates :password, :password_confirmation, presence: true, on: :create
  validates :password, confirmation: true

  class << self
    def sorted_team
      self.where(published: true).order('weight asc')
    end

    def options_for_office
      ['Madrid', 'Cambridge', 'Porto']
    end
  end

  def next
    self.class.sorted_team.where("weight > ?", weight).first
  end

  def prev
    self.class.sorted_team.where("weight < ?", weight).last
  end
end
