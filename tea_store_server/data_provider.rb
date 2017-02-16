include Configurations

class DataProvider

  @db
  def initialize
    get_db()
  end

  def get_db
    begin
      unless @db.nil?
        unless @db.closed?
        puts 'return created instance'
        return @db
        end
      end
      else
      @db = SQLite3::Database.open "db/#{Configurations::DATA["dbFile"]}"
      @db.results_as_hash = true
      return @db
    end
  end

  private :get_db

  def GetProductById(id)
    begin

      stm = @db.prepare "SELECT p.*,c.Name as Category_name FROM Products p inner join Categories c on c.id = p.Category_id WHERE p.Id = :req_id"
      rs = stm.execute "req_id" => id
      founded_product = rs.next

      features = GetProductFeatures(id)

      founded_product["features"] = features

      return founded_product

      rescue SQLite3::Exception => e
      puts "Exception occurred"
      puts e
    ensure
      #stm.close if (stm && db.closed? == false)
      #db.close if (db && db.closed? == false)
    end
  end


    def GetProductFeatures(id)
      begin

        stm = @db.prepare "select f.id,f.Name from Products_features pf inner join Features f on pf.Feature_id = f.Id where pf.Product_id = :id"
        rs = stm.execute id

        records = Array.new
        rs.each do |row|
          records << row
        end
        return records

      rescue SQLite3::Exception => e
        puts "Exception occurred"
        puts e
      ensure
        #stm.close if stm
        #db.close if db
      end
    end


    def GetProducts()
      begin
        begin


          stm = @db.prepare "SELECT * FROM Products WHERE Is_active=1"
          rs = stm.execute

          records = Array.new
          rs.each do |row|
            records << row
          end
          return records

        rescue SQLite3::Exception => e
          puts "Exception occurred"
          puts e
        ensure
          #stm.close if stm
          #db.close if db
        end
      end
    end

  def SearchProducts(filter_hash)
    begin
      begin


        filter = Filter.hash_json(filter_hash)


        name_exp = "%#{filter.Name}%"
        pf_filter = "("
        if(filter.ProductFeaturesArray != nil and filter.ProductFeaturesArray.length>0)
          for i in filter.ProductFeaturesArray
            if(i.is_a? Integer)
              pf_filter += "#{i},"
            else
              puts 'nonint'
            end

          end
          pf_filter = pf_filter.chomp(',')
        else
          pf_filter +="pf.feature_id"
        end
        pf_filter += ")"


        sqlquery = "SELECT distinct p.price*ifnull(p.discount_prc,0)/100 discount_usd,p.*,c.Name as Category_name FROM Products p inner join Categories c on c.id = p.Category_id inner join Products_features pf on pf.Product_id = p.id WHERE"
        sqlquery+= "  (p.Name LIKE :name) and "
        sqlquery+= " (p.price-(p.price*ifnull(p.discount_prc,0)/100) < :to_p or :to_p is null) and"
        sqlquery+= " (p.price-(p.price*ifnull(p.discount_prc,0)/100) > :from_p or :from_p is null) and "
        sqlquery+= " (:is_sale = 0 or (:is_sale = 1 and p.discount_prc is not null)) and"
        sqlquery+= " (:cat is null or :cat = p.Category_id) "
        sqlquery+= "and (pf.feature_id in #{pf_filter})"

        stm = @db.prepare sqlquery
        rs = stm.execute  "name" => name_exp,"from_p" => filter.FromPrice,"to_p" => filter.ToPrice,"is_sale" => filter.IsInSale,"cat" => filter.CategoryId#,"pf_str" =>filter.ProductFeaturesArray
        #rs = stm.execute "FromPrice" => filter.FromPrice, "ToPrice" => filter.ToPrice, "Name" => filter.Name,"IsInSale" => filter.IsInSale,"CategoryId" => filter.CategoryId,"ProductFeaturesArray" => pf_str



        count = 0
        records = Array.new
        rs.each do |row|
          records << row
          count = count+1
        end

        puts filter.ToPrice == nil
        puts "length #{count}"

        return records

      rescue SQLite3::Exception => e
        puts "Exception occurred"
        puts e
      ensure
        #stm.close if stm
        #db.close if db
      end
    end
  end

  def GetFeatures()
    begin
      return Features.all()
    end
  end

  def GetCategories()
    begin
      return Categories.all()
    end
  end
end
