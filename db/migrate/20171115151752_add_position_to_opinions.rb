class AddPositionToOpinions < ActiveRecord::Migration[5.1]
  def change
    add_column :opinions, :position, :integer
  end
end
