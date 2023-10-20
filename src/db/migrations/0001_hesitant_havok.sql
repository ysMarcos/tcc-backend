CREATE TABLE `compra` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nota_fiscal` varchar(150) NOT NULL,
	`data_compra` datetime NOT NULL,
	`valor_toal` float NOT NULL,
	`colaborador_id` int NOT NULL,
	`cliente_fornecedor_id` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `compra_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `compra` ADD CONSTRAINT `compra_colaborador_id_colaborador_id_fk` FOREIGN KEY (`colaborador_id`) REFERENCES `colaborador`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `compra` ADD CONSTRAINT `compra_cliente_fornecedor_id_cliente-fornecedor_id_fk` FOREIGN KEY (`cliente_fornecedor_id`) REFERENCES `cliente-fornecedor`(`id`) ON DELETE no action ON UPDATE no action;