class CreateTextBlocks < ActiveRecord::Migration[5.1]
  def change
    create_table :text_blocks do |t|
      t.string :title
      t.text :description
      t.string :text_side

      t.timestamps
    end
  end
end
