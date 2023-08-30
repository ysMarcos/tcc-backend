CREATE TABLE `cidade` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(50),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `cidade_id` PRIMARY KEY(`id`),
	CONSTRAINT `cidade_nome_unique` UNIQUE(`nome`)
);
--> statement-breakpoint
CREATE TABLE `endereco` (
	`id` int AUTO_INCREMENT NOT NULL,
	`rua` varchar(125) NOT NULL,
	`numero` varchar(6) NOT NULL,
	`bairro` varchar(50) NOT NULL,
	`cep` char(8) NOT NULL,
	`tipo` char(1),
	`complemento` varchar(50),
	`cidade_id` int,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `endereco_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pessoa_endereco` (
	`pessoa_id` int NOT NULL,
	`endereco_id` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pessoa` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(150),
	`email` varchar(100),
	`telefone` varchar(11),
	`cadastro` varchar(14),
	`registro` varchar(11),
	`isFisico` boolean,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `pessoa_id` PRIMARY KEY(`id`),
	CONSTRAINT `pessoa_email_unique` UNIQUE(`email`),
	CONSTRAINT `pessoa_telefone_unique` UNIQUE(`telefone`),
	CONSTRAINT `pessoa_cadastro_unique` UNIQUE(`cadastro`),
	CONSTRAINT `pessoa_registro_unique` UNIQUE(`registro`)
);
--> statement-breakpoint
ALTER TABLE `pessoa_endereco` ADD CONSTRAINT `pessoa_endereco_pessoa_id_pessoa_id_fk` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pessoa_endereco` ADD CONSTRAINT `pessoa_endereco_endereco_id_endereco_id_fk` FOREIGN KEY (`endereco_id`) REFERENCES `endereco`(`id`) ON DELETE no action ON UPDATE no action;