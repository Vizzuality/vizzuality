class AddPostUrlToProject < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :post_url, :string
  end
end
