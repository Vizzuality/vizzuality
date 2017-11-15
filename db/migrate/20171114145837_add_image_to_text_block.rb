class AddImageToTextBlock < ActiveRecord::Migration[5.1]
  def change
    add_attachment :text_blocks, :image
  end
end
