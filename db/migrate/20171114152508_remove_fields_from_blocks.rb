class RemoveFieldsFromBlocks < ActiveRecord::Migration[5.1]
  def change
    remove_column :blocks, :block_type
    remove_column :blocks, :url
    remove_column :blocks, :description
    remove_column :blocks, :published
    remove_attachment :blocks, :thumbnail
  end
end
