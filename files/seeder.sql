
insert into `unidade-medida` values (null, "kg", sysdate());

insert into item
values
(null, "Bonesaw", null, 525, 1, sysdate()),
(null, "Tweezers", null, 5236, 1, sysdate()),
(null, "Cars", null, 234, 1, sysdate()),
(null, "Feather duster", null, 523, 1, sysdate()),
(null, "Thimble", null, 124, 1, sysdate()),
(null, "Book of matches", null, 2, 1, sysdate()),
(null, "Banana", null, 6265, 1, sysdate()),
(null, "Spoon", null, 2369, 1, sysdate()),
(null, "Quilt", null, 838, 1, sysdate()),
(null, "Toothbrush", null, 569, 1, sysdate()),
(null, "Bar of soap", null, 1, 1, sysdate()),
(null, "Knife", null, 74, 1, sysdate()),
(null, "Sandal", null, 20, 1, sysdate()),
(null, "Sailboat", null, 378, 1, sysdate()),
(null, "Shirt button", null, 200, 1, sysdate()),
(null, "Coasters", null, 1258, 1, sysdate()),
(null, "Egg timer", null, 5.5, 1, sysdate()),
(null, "Desk", null, 1245, 1, sysdate()),
(null, "Rubber stamp", null, 24, 1, sysdate()),
(null, "Zebra", null, 982, 1, sysdate()),
(null, "Hair ribbon", null, 90, 1, sysdate()),
(null, "Wireless control", null, 100, 1, sysdate()),
(null, "Canvas", null, 10000, 1, sysdate()),
(null, "Snail shell", null, 52, 1, sysdate()),
(null, "Snowglobe", null, 5, 1, sysdate());

insert into permissao(nome)
values ("admin"),
("get-item"),("create-item"),("update-item"),("delete-item"),
("get-pessoa"),("create-pessoa"),("update-pessoa"),("delete-pessoa"),
("get-colaborador"),("create-colaborador"),("update-colaborador"),("delete-colaborador"),
("get-venda"),("create-venda"),("update-venda"),("delete-venda"),
("get-servico"),("create-servico"),("update-servico"),("delete-servico"),
("get-compra"),("create-compra"),("update-compra"),("delete-compra"),
("get-clifor"),("create-clifor"),("update-clifor"),("delete-clifor"),
("get-categoria"),("create-categoria"),("update-categoria"),("delete-categoria"),
("get-prestacao"),("create-prestacao"),("update-prestacao"),("delete-prestacao");

insert into pessoa(nome, email, telefone, cadastro, registro)
values( "admin", "admin@admin.com", "44997769448", "12069741095", "165460672");

insert into colaborador(usuario, senha, data_inicio_contrato, data_previsao_fim, pessoa_id)
values("admin", "$2b$12$DcxDuxXWXhatsHGq0JaoA.EBCMiYzGM9n\vcP.7arqEfdwSCCaEUq", sysdate(), sysdate(), 1);

insert into `permissao-colaborador`(permissao_id, colaborador_id)
values(1,1);
