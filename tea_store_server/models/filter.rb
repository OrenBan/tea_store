class Filter
  #contractor
  def initialize
    @ProductFeaturesArray = [ ]
  end


  attr_accessor :FromPrice
  attr_accessor :ToPrice
  attr_accessor :Name
  attr_accessor :IsInSale
  attr_accessor :CategoryId
  attr_accessor :ProductFeaturesArray

  def as_json(options={})
    {
        FromPrice: @FromPrice,
        ToPrice: @ToPrice,
        Name: @Name,
        IsInSale: @IsInSale,
        CategoryId: @CategoryId,
        ProductFeaturesArray: @ProductFeaturesArray
    }
  end

  def to_json(*options)
    as_json(*options).to_json(*options)
  end
def self.hash_json(json_hash)
  return Hashie::Mash.new json_hash
end


end