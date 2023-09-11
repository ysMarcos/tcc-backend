CREATE TABLE `permissao-colaborador` (
	`id` int AUTO_INCREMENT NOT NULL,
	`permissao_id` int NOT NULL,
	`colaborador_id` int NOT NULL,
	CONSTRAINT `permissao-colaborador_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `permissao` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(50) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `permissao_id` PRIMARY KEY(`id`),
	CONSTRAINT `permissao_nome_unique` UNIQUE(`nome`)
);
--> statement-breakpoint
ALTER TABLE `permissao-colaborador` ADD CONSTRAINT `permissao-colaborador_permissao_id_permissao_id_fk` FOREIGN KEY (`permissao_id`) REFERENCES `permissao`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `permissao-colaborador` ADD CONSTRAINT `permissao-colaborador_colaborador_id_colaborador_id_fk` FOREIGN KEY (`colaborador_id`) REFERENCES `colaborador`(`id`) ON DELETE no action ON UPDATE no action;