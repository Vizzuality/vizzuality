class AddAliasToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :alias, :string
  end
end
