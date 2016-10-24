ActiveAdmin.register Project do
  config.sort_order = 'weight_asc'
  config.paginate   = false

  sortable

  permit_params :title, :short_title, :meta_description, :fb_title,
    :fb_description, :link, :release_date, :summary, :body, :weight, :published,
    :client_id, :block_title, :cover_image, :project_image, :project_logo,
    :highlighted, :grid

  controller do
    def find_resource
      scoped_collection.friendly.find(params[:id])
    end
  end

  index do
    sortable_handle_column
    selectable_column
    id_column
    column :title
    column :slug
    column :link
    column :release_date
    column :client_id
    column :highlighted
    column :published
    column :created_at
    actions
  end

  filter :title
  filter :link
  filter :weight
  filter :highlighted
  filter :published
  filter :client_id
  filter :release_date
  filter :created_at

  form do |f|
    f.inputs "Project details" do
      f.input :client, include_blank: false
      f.input :title, required: true
      f.input :short_title
      f.input :fb_title
      f.input :fb_description
      f.input :meta_description
      f.input :link, label: 'Project url'
      f.input :cover_image, as: :file
      f.input :project_image, as: :file
      f.input :project_logo, as: :file
      f.input :summary
      f.input :body
      f.input :block_title
      f.input :weight
      f.input :grid
      f.input :highlighted
      f.input :release_date
      f.input :published
    end
    f.actions
  end
end
