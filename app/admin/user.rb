ActiveAdmin.register User do
  config.sort_order = 'weight_asc'
  config.paginate   = false

  sortable

  permit_params :name, :position, :quote, :twitter_user, :linkedin_user,
    :github_user, :dribbble_user, :photo, :birthday, :vizzday, :weight, :body, :admin,
    :email, :password, :password_confirmation, :published, :office

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
    column :photo do |o|
      image_tag o.photo.url(:thumb), class: 'team-photo-thumb'
    end
    column :name
    column :email
    column :position
    column :birthday
    column :vizzday
    column :office
    column :published
    actions
  end

  filter :email
  filter :position
  filter :published
  filter :office,
         as: :select,
         collection: User.options_for_office

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
      f.input :photo, as: :file, hint: f.object.photo.present? \
        ? image_tag(f.object.photo.url(:thumb))
        : content_tag(:span, "No photo yet")
      f.input :birthday, start_year: 1965
      f.input :vizzday, start_year: 2007
      f.input :office,
              as: :select,
              collection: User.options_for_office,
              include_blank: false

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
