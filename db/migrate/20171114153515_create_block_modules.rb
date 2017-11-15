class CreateBlockModules < ActiveRecord::Migration[5.1]
  def change
    create_table :block_modules do |t|
      t.integer :block_id
      t.text :description
      t.attachment :image

      t.timestamps
    end
  end
end
