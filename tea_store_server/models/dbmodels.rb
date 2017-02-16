

class Features
  include DataMapper::Resource

  property :Id,         Serial
  property :Name,       Text
  property :Is_active,   Integer
end


class Categories
  include DataMapper::Resource

  property :Id,         Serial, :key => true
  property :Is_active,   Integer
  property :Name,       String

end


