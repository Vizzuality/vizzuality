class CreateBlocks < ActiveRecord::Migration[5.0]
  def change
    create_table :blocks do |t|
      t.integer :block_type, default: 0
      t.string :title
      t.string :url
      t.text :description
      t.attachment :thumbnail
      t.boolean :published, default: false
      t.belongs_to :project, index: true

      t.timestamps
    end
  end
end
