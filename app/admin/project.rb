ActiveAdmin.register Project do
  config.sort_order = 'weight_asc'
  config.paginate   = false

  sortable

  permit_params :title, :short_title, :meta_description, :fb_title,
    :fb_description, :link, :release_date, :summary, :body, :weight, :published,
    :client_id, :cover_image, :project_image, :project_logo,
    :highlighted, :grid, :post_url, :post_title, :author, :short_link,
    text_blocks_attributes: [:id, :title, :description, :image, :text_side, :_destroy],
    map_attributes: [:id, :title, :description, :url, :_destroy],
    video_attributes: [:id, :title, :style, :url, :_destroy],
    opinions_attributes: [:id, :title, :author_name, :author_url, :thumbnail, :position, :_destroy],
    block_attributes: [:id, :title, :_destroy, block_modules_attributes: [:id, :_destroy, :description, :image, :position]]

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
    f.semantic_errors *f.object.errors.keys

    f.inputs "Project details" do
      f.input :client, include_blank: false
      f.input :title, required: true
      f.input :short_title
      f.input :fb_title
      f.input :fb_description
      f.input :meta_description
      f.input :link, label: 'Project url'
      f.input :short_link, label: 'Project short url'
      f.input :cover_image, as: :file, hint: f.object.cover_image.present? \
        ? image_tag(f.object.cover_image.url(:thumb))
        : content_tag(:span, "No cover image yet")

      f.input :project_image, as: :file, hint: f.object.project_image.present? \
        ? image_tag(f.object.project_image.url(:thumb))
        : content_tag(:span, "No project image yet")

      f.input :project_logo, as: :file, hint: f.object.project_logo.present? \
        ? image_tag(f.object.project_logo.url(:medium))
        : content_tag(:span, "No project logo yet")

      f.input :summary
      f.input :body

      f.has_many :text_blocks, allow_destroy: true do |t|
        t.input :title
        t.input :description
        t.input :image, as: :file, hint: t.object.image.present? \
          ? image_tag(t.object.image.url(:thumb))
          : content_tag(:span, "No image yet")

        t.input :text_side,
                as: :select,
                collection: TextBlock.options_for_text_side,
                include_blank: false
      end

      f.has_many :map, allow_destroy: true do |m|
        m.input :title
        m.input :url
        m.input :description
      end

      f.has_many :video, allow_destroy: true do |v|
        v.input :title
        v.input :url
        v.input :style
      end

      f.has_many :opinions, allow_destroy: true do |o|
        o.input :title
        o.input :author_name
        o.input :author_url
        o.input :position,
                as: :select,
                collection: Opinion.options_for_position,
                include_blank: false

        o.input :thumbnail, as: :file, hint: o.object.thumbnail.present? \
          ? image_tag(o.object.thumbnail.url(:small))
          : content_tag(:span, "No thumbnail yet")
      end

      f.has_many :block, allow_destroy: true do |b|
        b.input :title

        b.has_many :block_modules, allow_destroy: true do |bm|
          bm.input :position,
                   as: :select,
                   collection: BlockModule.options_for_position,
                   include_blank: false

          bm.input :description
          bm.input :image, as: :file, hint: bm.object.image.present? \
            ? image_tag(bm.object.image.url(:thumb))
            : content_tag(:span, "No image yet")
        end
      end

      f.input :weight
      f.input :grid
      f.input :highlighted
      f.input :post_title
      f.input :post_url
      f.input :release_date
      f.input :author
      f.input :published
    end
    f.actions
  end
end
