class AddVizzdayToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :vizzday, :date
  end
end
