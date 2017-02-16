before do
  content_type :json
  headers 'Access-Control-Allow-Origin' => '*',
          'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']

end
options "*" do
  response.headers["Allow"] = "HEAD,GET,PUT,DELETE,OPTIONS"

  # Needed for AngularJS
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept"


  200
end

get '/product/:id' do
  content_type :json
  dp = DataProvider.new
  dp.GetProductById(params[:id]).to_json

end

get '/product' do
  content_type :json

  dp = DataProvider.new
  dp.GetProducts().to_json

end

post '/product_search' do
  request_obj = JSON.parse(request.body.read)
  #puts request_obj#["Name"]


   dp = DataProvider.new
   dp.SearchProducts(request_obj).to_json

end

