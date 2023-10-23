CREATE TABLE `servico` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(50) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `servico_id` PRIMARY KEY(`id`),
	CONSTRAINT `servico_nome_unique` UNIQUE(`nome`)
);
