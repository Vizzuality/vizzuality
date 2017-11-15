class AddPositionToBlockModules < ActiveRecord::Migration[5.1]
  def change
    add_column :block_modules, :position, :integer
  end
end
