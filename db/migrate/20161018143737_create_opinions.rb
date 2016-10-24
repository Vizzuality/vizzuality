class CreateOpinions < ActiveRecord::Migration[5.0]
  def change
    create_table :opinions do |t|
      t.string :title
      t.attachment :thumbnail
      t.string :author
      t.boolean :published, default: false
      t.belongs_to :project, index: true

      t.timestamps
    end
  end
end
