ActiveAdmin.register User do
  config.sort_order = 'weight_asc'
  config.paginate   = false

  sortable

  permit_params :name, :position, :quote, :twitter_user, :linkedin_user,
    :github_user, :dribbble_user, :photo, :birthday, :weight, :body, :admin,
    :email, :password, :password_confirmation, :published

  controller do
    def find_resource
      scoped_collection.friendly.find(params[:id])
    end

    def update
      if params[:user][:password].blank? && params[:user][:password_confirmation].blank?
        params[:user].delete("password")
        params[:user].delete("password_confirmation")
      end
      super
    end
  end

  index do
    sortable_handle_column
    selectable_column
    id_column
    column :name
    column :slug
    column :email
    column :position
    column :created_at
    actions
  end

  filter :email
  filter :position
  filter :created_at

  form do |f|
    f.inputs "Team member detail" do
      f.input :name, required: true
      f.input :position, required: true
      f.input :email, required: true
      f.input :quote, required: true
      f.input :twitter_user
      f.input :linkedin_user
      f.input :github_user
      f.input :dribbble_user
      # f.input :photo, as: :file
      f.input :photo, as: :file, hint: f.object.cover_page.present? \
        ? image_tag(f.object.cover_page.url(:thumb))
        : content_tag(:span, "No photo yet")
      f.input :photo_cache, as: :hidden
      f.input :birthday, start_year: 1960
      f.input :weight
      f.input :body
      f.input :admin
      f.input :published
      f.input :password, required: false
      f.input :password_confirmation, required: false
    end
    f.actions
  end
end
