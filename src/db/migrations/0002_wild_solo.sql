CREATE TABLE `item_compra` (
	`id` int AUTO_INCREMENT NOT NULL,
	`item_id` int NOT NULL,
	`compra_id` int NOT NULL,
	`quantidade` int NOT NULL,
	`valor` float NOT NULL,
	CONSTRAINT `item_compra_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `item_compra` ADD CONSTRAINT `item_compra_item_id_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_compra` ADD CONSTRAINT `item_compra_compra_id_compra_id_fk` FOREIGN KEY (`compra_id`) REFERENCES `compra`(`id`) ON DELETE no action ON UPDATE no action;