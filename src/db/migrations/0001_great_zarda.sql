CREATE TABLE `cidade` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(50),
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
	`complemento` varchar(50),
	`cidadeId` int,
	CONSTRAINT `endereco_id` PRIMARY KEY(`id`)
);
