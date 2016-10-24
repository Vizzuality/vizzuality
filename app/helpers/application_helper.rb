module ApplicationHelper
  def title(page_title)
    provide :title, page_title.to_s
  end
  def body_class(class_name)
    provide :body_class, class_name.to_s
  end
end
