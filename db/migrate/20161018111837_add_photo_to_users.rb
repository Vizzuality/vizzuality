class AddPhotoToUsers < ActiveRecord::Migration[5.1]
  def up
    add_attachment :users, :photo
  end
end
