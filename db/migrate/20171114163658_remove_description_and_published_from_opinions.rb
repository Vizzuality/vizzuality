class RemoveDescriptionAndPublishedFromOpinions < ActiveRecord::Migration[5.1]
  def change
    remove_column :opinions, :description
    remove_column :opinions, :published
  end
end
