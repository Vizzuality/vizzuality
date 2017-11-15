# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171115151752) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", id: :serial, force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_id", null: false
    t.string "resource_type", null: false
    t.string "author_type"
    t.integer "author_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "block_modules", force: :cascade do |t|
    t.integer "block_id"
    t.text "description"
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position"
  end

  create_table "blocks", id: :serial, force: :cascade do |t|
    t.string "title"
    t.integer "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_blocks_on_project_id"
  end

  create_table "clients", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "override_width"
    t.boolean "published", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "logo_file_name"
    t.string "logo_content_type"
    t.integer "logo_file_size"
    t.datetime "logo_updated_at"
    t.string "logo_white_file_name"
    t.string "logo_white_content_type"
    t.integer "logo_white_file_size"
    t.datetime "logo_white_updated_at"
  end

  create_table "friendly_id_slugs", id: :serial, force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
    t.index ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"
  end

  create_table "maps", force: :cascade do |t|
    t.string "title"
    t.string "url"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "project_id"
  end

  create_table "opinions", id: :serial, force: :cascade do |t|
    t.string "title"
    t.string "thumbnail_file_name"
    t.string "thumbnail_content_type"
    t.integer "thumbnail_file_size"
    t.datetime "thumbnail_updated_at"
    t.string "author_name"
    t.integer "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "author_url"
    t.integer "position"
    t.index ["project_id"], name: "index_opinions_on_project_id"
  end

  create_table "projects", id: :serial, force: :cascade do |t|
    t.string "title"
    t.string "short_title"
    t.string "meta_description"
    t.string "fb_title"
    t.string "fb_description"
    t.string "link"
    t.date "release_date"
    t.text "summary"
    t.text "body"
    t.integer "weight", default: 0
    t.boolean "highlighted"
    t.boolean "published", default: false
    t.integer "client_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "cover_image_file_name"
    t.string "cover_image_content_type"
    t.integer "cover_image_file_size"
    t.datetime "cover_image_updated_at"
    t.string "project_logo_file_name"
    t.string "project_logo_content_type"
    t.integer "project_logo_file_size"
    t.datetime "project_logo_updated_at"
    t.string "project_image_file_name"
    t.string "project_image_content_type"
    t.integer "project_image_file_size"
    t.datetime "project_image_updated_at"
    t.integer "grid"
    t.string "slug"
    t.string "post_url"
    t.string "post_title"
    t.string "short_link"
    t.string "author"
    t.index ["client_id"], name: "index_projects_on_client_id"
    t.index ["slug"], name: "index_projects_on_slug", unique: true
  end

  create_table "text_blocks", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "text_side"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.integer "project_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "position"
    t.string "quote"
    t.string "twitter_user"
    t.string "linkedin_user"
    t.string "dribbble_user"
    t.string "github_user"
    t.integer "weight", default: 0
    t.text "body"
    t.boolean "published", default: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "photo_file_name"
    t.string "photo_content_type"
    t.integer "photo_file_size"
    t.datetime "photo_updated_at"
    t.date "birthday"
    t.boolean "admin", default: false
    t.string "slug"
    t.string "alias"
    t.date "vizzday"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["slug"], name: "index_users_on_slug", unique: true
  end

  create_table "videos", force: :cascade do |t|
    t.string "title"
    t.string "style"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "project_id"
  end

end
