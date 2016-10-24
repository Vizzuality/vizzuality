class CreateClients < ActiveRecord::Migration[5.0]
  def change
    create_table :clients do |t|
      t.string :name
      t.integer :override_width
      t.boolean :published, default: false

      t.timestamps
    end
  end
end
