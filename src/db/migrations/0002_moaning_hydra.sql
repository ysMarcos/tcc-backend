CREATE TABLE `item_categoria` (
	`item_id` int NOT NULL,
	`categoria_id` int NOT NULL
);
--> statement-breakpoint
ALTER TABLE `item_categoria` ADD CONSTRAINT `item_categoria_item_id_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_categoria` ADD CONSTRAINT `item_categoria_categoria_id_categoria_id_fk` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE no action ON UPDATE no action;