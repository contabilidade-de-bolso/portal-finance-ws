INSERT INTO tb_category_group (cd_category_group, nm_category_group) VALUES ('REN', 'Renda');
INSERT INTO tb_category_group (cd_category_group, nm_category_group) VALUES ('GAE', 'Gastos Essenciais');
INSERT INTO tb_category_group (cd_category_group, nm_category_group) VALUES ('ESV', 'Estilo de Vida');
INSERT INTO tb_category_group (cd_category_group, nm_category_group) VALUES ('EMP', 'Empréstimos');
INSERT INTO tb_category_group (cd_category_group, nm_category_group) VALUES ('LEC', 'Lançamentos entre contas');
INSERT INTO tb_category_group (cd_category_group, nm_category_group) VALUES ('NAC', 'Não classificado');

INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'REN'),'BON','Bônus');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'REN'),'EMP','Empréstimo');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'REN'),'OUR','Outras rendas');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'REN'),'REM','Remuneração');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'REN'),'REN','Rendimento');

INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'GAE'),'COR','Contas residenciais');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'GAE'),'EDU','Educação');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'GAE'),'MER','Mercado');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'GAE'),'MOR','Moradia');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'GAE'),'SAU','Saúde');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'GAE'),'TRA','Transporte');

INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'BER','Bares / Restaurantes');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'COM','Compras');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'CUP','Cuidados pessoais');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'DDT','Despesas do trabalho');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'EMD','Empregados domésticos');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'FEF','Família / Filhos');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'IMP','Impostos');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'LAZ','Lazer');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'OUG','Outros gastos');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'PED','Presentes / Doações');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'SAQ','Saques');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'SER','Serviços');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'TIT','TV / Internet / Telefone');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'TAB','Taxas bancárias');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'ESV'),'VIA','Viagem');

INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'EMP'),'CAR','Carnê');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'EMP'),'CHE','Cheque especial');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'EMP'),'CRE','Crediário');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'EMP'),'CRC','Crédito consignado');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'EMP'),'JUR','Juros');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'EMP'),'JDC','Juros de cartão');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'EMP'),'OUE','Outros empréstimos');

INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'LEC'),'APL','Aplicação');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'LEC'),'PAC','Pagamento de cartão');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'LEC'),'RES','Resgate');
INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'LEC'),'TRA','Transferência');

INSERT INTO tb_category_group_sub (category_group_id, cd_category_group_sub, nm_category_group_sub) VALUES ((SELECT id FROM tb_category_group WHERE cd_category_group = 'NAC'),'NAC','Não Categorizado');


INSERT INTO tb_transaction_type (cd_transaction_type, nm_transaction_type) VALUES
('ENT', 'Entrada', 'CURRENT_TIMESTAMP'),
('SAI', 'Saída', 'CURRENT_TIMESTAMP');

UPDATE tb_category_group SET icon = 'fas fa-dollar-sign'  WHERE cd_category_group = 'REN';
UPDATE tb_category_group SET icon = 'fas fa-piggy-bank'  WHERE cd_category_group = 'GAE';
UPDATE tb_category_group SET icon = 'fas fa-hand-holding-heart'  WHERE cd_category_group = 'ESV';
UPDATE tb_category_group SET icon = 'fas fa-hand-holding-usd'  WHERE cd_category_group = 'EMP';
UPDATE tb_category_group SET icon = 'far fa-credit-card'  WHERE cd_category_group = 'LEC';
UPDATE tb_category_group SET icon = 'fas fa-question-circle'  WHERE cd_category_group = 'NAC';
