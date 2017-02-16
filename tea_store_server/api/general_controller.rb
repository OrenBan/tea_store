
get '/features' do
  content_type :json

  DataProvider.GetFeatures.to_json

end

get '/categories' do
  content_type :json

  dp = DataProvider.new
  dp.GetCategories.to_json

end



get '/products_features' do
  content_type :json

  dp = DataProvider.new
  dp.GetProductsFeatures().to_json

end

get '/system-configuration' do
  content_type :json
  dp = DataProvider.new

  {:categories => dp.GetCategories, :features => dp.GetFeatures}.to_json

end

