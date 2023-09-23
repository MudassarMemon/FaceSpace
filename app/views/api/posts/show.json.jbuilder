json.post do
    json.extract! @post, :id, :author_id, :body, :created_at, :updated_at
end
