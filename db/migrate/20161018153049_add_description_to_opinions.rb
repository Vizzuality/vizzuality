class AddDescriptionToOpinions < ActiveRecord::Migration[5.0]
  def change
    add_column :opinions, :description, :text
  end
end
