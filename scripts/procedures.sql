--drop procedure test();
CREATE OR REPLACE PROCEDURE movement(requested_amount integer, idSize integer,  
idProductType integer, idOperation integer, idUser integer)
LANGUAGE plpgsql
AS $$
DECLARE
  available_amount integer := 0;
  operation varchar(20) := '';
BEGIN 
	SELECT amount into available_amount 
	FROM inventory
	WHERE "id_productType" = idProductType
	AND id_size = idSize;
	
  	SELECT op.name into operation FROM operation op WHERE op.id = idOperation;
	RAISE INFO 'operation: %', operation;
	 
  IF idOperation = 1 THEN	
  	IF available_amount IS NULL THEN
		insert into inventory (amount, "id_productType", id_size) 
			values (requested_amount, idProductType, idSize);
	ELSE	
		update inventory 
		SET amount = (available_amount + requested_amount)
		WHERE "id_productType" = idProductType
		AND id_size = idSize;
	END IF;		
	insert into movement (amount, "id_productType", id_size, id_operation, id_user) 
			values (requested_amount, idProductType, idSize, idOperation, idUser);
  END IF;
  
  IF idOperation = 2 THEN	 
	--restauration
  END IF;

  IF idOperation = 3 THEN	 
	--sale
	IF available_amount < requested_amount THEN
		RAISE NOTICE 'No existen piezas en el inventario';
		RAISE EXCEPTION 'Amount not available: %', available_amount 
      	USING HINT = 'Dont exist pieces in the inventory';
	ELSE
		update inventory 
		SET amount = (available_amount - requested_amount)
		WHERE "id_productType" = idProductType
		AND id_size = idSize;
	
		INSERT INTO movement (amount, "id_productType", id_size, id_operation, id_user) 
			VALUES (requested_amount, idProductType, idSize, idOperation, idUser);		
	END IF;
	
  END IF;

  IF idOperation = 3 THEN	 
	--damage
  END IF;
   
  
END $$;