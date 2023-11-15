CREATE TABLE `categoria` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(50) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `categoria_id` PRIMARY KEY(`id`),
	CONSTRAINT `categoria_nome_unique` UNIQUE(`nome`)
);
--> statement-breakpoint
CREATE TABLE `cliente-fornecedor` (
	`id` int AUTO_INCREMENT NOT NULL,
	`isCliente` boolean NOT NULL,
	`pessoa_id` int,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `cliente-fornecedor_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `colaborador` (
	`id` int AUTO_INCREMENT NOT NULL,
	`usuario` varchar(50) NOT NULL,
	`senha` varchar(250) NOT NULL,
	`data_inicio_contrato` datetime NOT NULL,
	`data_previsao_fim` datetime NOT NULL,
	`ativo` boolean DEFAULT true,
	`pessoa_id` int,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `colaborador_id` PRIMARY KEY(`id`),
	CONSTRAINT `colaborador_usuario_unique` UNIQUE(`usuario`)
);
--> statement-breakpoint
CREATE TABLE `compra` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nota_fiscal` varchar(150) NOT NULL,
	`data_compra` datetime NOT NULL,
	`valor_total` float NOT NULL,
	`colaborador_id` int NOT NULL,
	`cliente_fornecedor_id` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `compra_id` PRIMARY KEY(`id`)
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
	`cidade` varchar(150) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `endereco_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `item_categoria` (
	`id` int AUTO_INCREMENT NOT NULL,
	`item_id` int NOT NULL,
	`categoria_id` int NOT NULL,
	CONSTRAINT `item_categoria_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `item_compra` (
	`id` int AUTO_INCREMENT NOT NULL,
	`item_id` int NOT NULL,
	`compra_id` int NOT NULL,
	`quantidade` int NOT NULL,
	`valor` float NOT NULL,
	CONSTRAINT `item_compra_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `item_servico` (
	`id` int AUTO_INCREMENT NOT NULL,
	`item_id` int NOT NULL,
	`prestacaoservico_id` int NOT NULL,
	CONSTRAINT `item_servico_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `item_venda` (
	`id` int AUTO_INCREMENT NOT NULL,
	`item_id` int NOT NULL,
	`venda_id` int NOT NULL,
	`quantidade` int NOT NULL,
	`valor` float NOT NULL,
	CONSTRAINT `item_venda_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `item` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(50) NOT NULL,
	`descricao` varchar(150),
	`valor_unitario` float NOT NULL,
	`quantidade` int DEFAULT 0,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `item_id` PRIMARY KEY(`id`),
	CONSTRAINT `item_nome_unique` UNIQUE(`nome`)
);
--> statement-breakpoint
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
CREATE TABLE `pessoa_endereco` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pessoa_id` int NOT NULL,
	`endereco_id` int NOT NULL,
	CONSTRAINT `pessoa_endereco_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pessoa` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(150) NOT NULL,
	`email` varchar(100) NOT NULL,
	`telefone` varchar(11) NOT NULL,
	`cadastro` varchar(14) NOT NULL,
	`registro` varchar(11),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `pessoa_id` PRIMARY KEY(`id`),
	CONSTRAINT `pessoa_email_unique` UNIQUE(`email`),
	CONSTRAINT `pessoa_cadastro_unique` UNIQUE(`cadastro`),
	CONSTRAINT `pessoa_registro_unique` UNIQUE(`registro`)
);
--> statement-breakpoint
CREATE TABLE `prestacao` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nota_fiscal` varchar(150),
	`colaborador_id` int NOT NULL,
	`cliente_fornecedor_id` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `prestacao_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `prestacao_servico` (
	`id` int AUTO_INCREMENT NOT NULL,
	`valor_cobrado` float NOT NULL,
	`prestacao_id` int NOT NULL,
	`servico_id` int NOT NULL,
	`data_inicio` date NOT NULL,
	`data_fim` date NOT NULL,
	`isPago` boolean DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `prestacao_servico_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `servico` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(50) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `servico_id` PRIMARY KEY(`id`),
	CONSTRAINT `servico_nome_unique` UNIQUE(`nome`)
);
--> statement-breakpoint
CREATE TABLE `venda` (
	`id` int AUTO_INCREMENT NOT NULL,
	`data_venda` datetime NOT NULL,
	`colaborador_id` int NOT NULL,
	`cliente_fornecedor_id` int,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `venda_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `cliente-fornecedor` ADD CONSTRAINT `cliente-fornecedor_pessoa_id_pessoa_id_fk` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `colaborador` ADD CONSTRAINT `colaborador_pessoa_id_pessoa_id_fk` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `compra` ADD CONSTRAINT `compra_colaborador_id_colaborador_id_fk` FOREIGN KEY (`colaborador_id`) REFERENCES `colaborador`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `compra` ADD CONSTRAINT `compra_cliente_fornecedor_id_cliente-fornecedor_id_fk` FOREIGN KEY (`cliente_fornecedor_id`) REFERENCES `cliente-fornecedor`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_categoria` ADD CONSTRAINT `item_categoria_item_id_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_categoria` ADD CONSTRAINT `item_categoria_categoria_id_categoria_id_fk` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_compra` ADD CONSTRAINT `item_compra_item_id_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_compra` ADD CONSTRAINT `item_compra_compra_id_compra_id_fk` FOREIGN KEY (`compra_id`) REFERENCES `compra`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_servico` ADD CONSTRAINT `item_servico_item_id_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_servico` ADD CONSTRAINT `item_servico_prestacaoservico_id_prestacao_servico_id_fk` FOREIGN KEY (`prestacaoservico_id`) REFERENCES `prestacao_servico`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_venda` ADD CONSTRAINT `item_venda_item_id_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `item_venda` ADD CONSTRAINT `item_venda_venda_id_venda_id_fk` FOREIGN KEY (`venda_id`) REFERENCES `venda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `permissao-colaborador` ADD CONSTRAINT `permissao-colaborador_permissao_id_permissao_id_fk` FOREIGN KEY (`permissao_id`) REFERENCES `permissao`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `permissao-colaborador` ADD CONSTRAINT `permissao-colaborador_colaborador_id_colaborador_id_fk` FOREIGN KEY (`colaborador_id`) REFERENCES `colaborador`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pessoa_endereco` ADD CONSTRAINT `pessoa_endereco_pessoa_id_pessoa_id_fk` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pessoa_endereco` ADD CONSTRAINT `pessoa_endereco_endereco_id_endereco_id_fk` FOREIGN KEY (`endereco_id`) REFERENCES `endereco`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `prestacao` ADD CONSTRAINT `prestacao_colaborador_id_colaborador_id_fk` FOREIGN KEY (`colaborador_id`) REFERENCES `colaborador`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `prestacao` ADD CONSTRAINT `prestacao_cliente_fornecedor_id_cliente-fornecedor_id_fk` FOREIGN KEY (`cliente_fornecedor_id`) REFERENCES `cliente-fornecedor`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `prestacao_servico` ADD CONSTRAINT `prestacao_servico_prestacao_id_prestacao_id_fk` FOREIGN KEY (`prestacao_id`) REFERENCES `prestacao`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `prestacao_servico` ADD CONSTRAINT `prestacao_servico_servico_id_servico_id_fk` FOREIGN KEY (`servico_id`) REFERENCES `servico`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `venda` ADD CONSTRAINT `venda_colaborador_id_colaborador_id_fk` FOREIGN KEY (`colaborador_id`) REFERENCES `colaborador`(`id`) ON DELETE no action ON UPDATE no action;