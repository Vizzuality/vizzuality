class AddLogoToClient < ActiveRecord::Migration[5.1]
  def up
    add_attachment :clients, :logo
    add_attachment :clients, :logo_white
  end
end
