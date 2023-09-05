ALTER TABLE `colaborador` MODIFY COLUMN `usuario` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `colaborador` MODIFY COLUMN `senha` varchar(250) NOT NULL;--> statement-breakpoint
ALTER TABLE `colaborador` MODIFY COLUMN `data_inicio_contrato` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `colaborador` MODIFY COLUMN `data_previsao_fim` datetime NOT NULL;