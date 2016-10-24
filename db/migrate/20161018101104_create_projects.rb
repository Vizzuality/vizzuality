class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.string :title
      t.string :short_title
      t.string :meta_description
      t.string :fb_title
      t.string :fb_description
      t.string :link
      t.date :release_date
      t.text :summary
      t.text :body
      t.integer :weight, default: 0
      t.boolean :highlighted
      t.boolean :published, default: false
      t.belongs_to :client, index: true

      t.timestamps
    end
  end
end
