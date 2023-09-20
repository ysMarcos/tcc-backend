CREATE TABLE `cliente-fornecedor` (
	`id` int AUTO_INCREMENT NOT NULL,
	`isCliente` boolean NOT NULL,
	`pessoa_id` int,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `cliente-fornecedor_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `venda` (
	`id` int AUTO_INCREMENT NOT NULL,
	`data_venda` datetime NOT NULL,
	`colaborador_id` int NOT NULL,
	`cliente_fornecedor_id` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `venda_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `item` ADD `descricao` varchar(150);--> statement-breakpoint
ALTER TABLE `cliente-fornecedor` ADD CONSTRAINT `cliente-fornecedor_pessoa_id_pessoa_id_fk` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `venda` ADD CONSTRAINT `venda_colaborador_id_colaborador_id_fk` FOREIGN KEY (`colaborador_id`) REFERENCES `colaborador`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `venda` ADD CONSTRAINT `venda_cliente_fornecedor_id_cliente-fornecedor_id_fk` FOREIGN KEY (`cliente_fornecedor_id`) REFERENCES `cliente-fornecedor`(`id`) ON DELETE no action ON UPDATE no action;