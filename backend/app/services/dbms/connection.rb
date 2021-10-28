module DBMS
  class Connection
    class << self
      def ar_up?
        begin
          return ActiveRecord::Base.connection.present?
        rescue ActiveRecordError
        end
        false
      end
    end
  end
end
