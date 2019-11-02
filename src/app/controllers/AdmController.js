import CategoryGroup from "../models/CategoryGroup";
import CategoryGroupSub from "../models/CategoryGroupSub";
import TransactionType from "../models/TransactionType";

class AdmController {
  async insertDmCategory(req, res) {
    let REN = { cd_category_group: "REN", nm_category_group: "Renda" };
    await CategoryGroup.create(REN);

    let GAE = {
      cd_category_group: "GAE",
      nm_category_group: "Gastos Essenciais"
    };
    await CategoryGroup.create(GAE);

    let ESV = { cd_category_group: "ESV", nm_category_group: "Estilo de Vida" };
    await CategoryGroup.create(ESV);

    let EMP = { cd_category_group: "EMP", nm_category_group: "Empréstimos" };
    await CategoryGroup.create(EMP);

    let LEC = {
      cd_category_group: "LEC",
      nm_category_group: "Lançamentos entre contas"
    };
    await CategoryGroup.create(LEC);

    let NAC = {
      cd_category_group: "NAC",
      nm_category_group: "Não classificado"
    };
    await CategoryGroup.create(NAC);

    return res.json({});
  }

  async insertDmCategorySub(req, res) {
    let BON = {
      category_group_id: 1,
      cd_category_group_sub: "BON",
      nm_category_group_sub: "Bônus"
    };
    await CategoryGroupSub.create(BON);

    let EMP = {
      category_group_id: 1,
      cd_category_group_sub: "EMP",
      nm_category_group_sub: "Empréstimo"
    };
    await CategoryGroupSub.create(EMP);

    let OUR = {
      category_group_id: 1,
      cd_category_group_sub: "OUR",
      nm_category_group_sub: "Outras rendas"
    };
    await CategoryGroupSub.create(OUR);

    let REM = {
      category_group_id: 1,
      cd_category_group_sub: "REM",
      nm_category_group_sub: "Remuneração"
    };
    await CategoryGroupSub.create(REM);

    let REN = {
      category_group_id: 1,
      cd_category_group_sub: "REN",
      nm_category_group_sub: "Rendimento"
    };
    await CategoryGroupSub.create(REN);

    let COR = {
      category_group_id: 2,
      cd_category_group_sub: "COR",
      nm_category_group_sub: "Contas residenciais"
    };
    await CategoryGroupSub.create(COR);

    let EDU = {
      category_group_id: 2,
      cd_category_group_sub: "EDU",
      nm_category_group_sub: "Educação"
    };
    await CategoryGroupSub.create(EDU);

    let MER = {
      category_group_id: 2,
      cd_category_group_sub: "MER",
      nm_category_group_sub: "Mercado"
    };
    await CategoryGroupSub.create(MER);

    let MOR = {
      category_group_id: 2,
      cd_category_group_sub: "MOR",
      nm_category_group_sub: "Moradia"
    };
    await CategoryGroupSub.create(MOR);

    let SAU = {
      category_group_id: 2,
      cd_category_group_sub: "SAU",
      nm_category_group_sub: "Saúde"
    };
    await CategoryGroupSub.create(SAU);

    let TRA2 = {
      category_group_id: 2,
      cd_category_group_sub: "TRA",
      nm_category_group_sub: "Transporte"
    };
    await CategoryGroupSub.create(TRA2);

    let BER = {
      category_group_id: 3,
      cd_category_group_sub: "BER",
      nm_category_group_sub: "Bares / Restaurantes"
    };
    await CategoryGroupSub.create(BER);

    let COM = {
      category_group_id: 3,
      cd_category_group_sub: "COM",
      nm_category_group_sub: "Compras"
    };
    await CategoryGroupSub.create(COM);

    let CUP = {
      category_group_id: 3,
      cd_category_group_sub: "CUP",
      nm_category_group_sub: "Cuidados pessoais"
    };
    await CategoryGroupSub.create(CUP);

    let DDT = {
      category_group_id: 3,
      cd_category_group_sub: "DDT",
      nm_category_group_sub: "Despesas do trabalho"
    };
    await CategoryGroupSub.create(DDT);

    let EMD = {
      category_group_id: 3,
      cd_category_group_sub: "EMD",
      nm_category_group_sub: "Empregados domésticos"
    };
    await CategoryGroupSub.create(EMD);

    let FEF = {
      category_group_id: 3,
      cd_category_group_sub: "FEF",
      nm_category_group_sub: "Família / Filhos"
    };
    await CategoryGroupSub.create(FEF);

    let IMP = {
      category_group_id: 3,
      cd_category_group_sub: "IMP",
      nm_category_group_sub: "Impostos"
    };
    await CategoryGroupSub.create(IMP);

    let LAZ = {
      category_group_id: 3,
      cd_category_group_sub: "LAZ",
      nm_category_group_sub: "Lazer"
    };
    await CategoryGroupSub.create(LAZ);

    let OUG = {
      category_group_id: 3,
      cd_category_group_sub: "OUG",
      nm_category_group_sub: "Outros gastos"
    };
    await CategoryGroupSub.create(OUG);

    let PED = {
      category_group_id: 3,
      cd_category_group_sub: "PED",
      nm_category_group_sub: "Presentes / Doações"
    };
    await CategoryGroupSub.create(PED);

    let SAQ = {
      category_group_id: 3,
      cd_category_group_sub: "SAQ",
      nm_category_group_sub: "Saques"
    };
    await CategoryGroupSub.create(SAQ);

    let SER = {
      category_group_id: 3,
      cd_category_group_sub: "SER",
      nm_category_group_sub: "Serviços"
    };
    await CategoryGroupSub.create(SER);

    let TIT = {
      category_group_id: 3,
      cd_category_group_sub: "TIT",
      nm_category_group_sub: "TV / Internet / Telefone"
    };
    await CategoryGroupSub.create(TIT);

    let TAB = {
      category_group_id: 3,
      cd_category_group_sub: "TAB",
      nm_category_group_sub: "Taxas bancárias"
    };
    await CategoryGroupSub.create(TAB);

    let VIA = {
      category_group_id: 3,
      cd_category_group_sub: "VIA",
      nm_category_group_sub: "Viagem"
    };
    await CategoryGroupSub.create(VIA);

    let CAR = {
      category_group_id: 4,
      cd_category_group_sub: "CAR",
      nm_category_group_sub: "Carnê"
    };
    await CategoryGroupSub.create(CAR);

    let CHE = {
      category_group_id: 4,
      cd_category_group_sub: "CHE",
      nm_category_group_sub: "Cheque especial"
    };
    await CategoryGroupSub.create(CHE);

    let CRE = {
      category_group_id: 4,
      cd_category_group_sub: "CRE",
      nm_category_group_sub: "Crediário"
    };
    await CategoryGroupSub.create(CRE);

    let CRC = {
      category_group_id: 4,
      cd_category_group_sub: "CRC",
      nm_category_group_sub: "Crédito consignado"
    };
    await CategoryGroupSub.create(CRC);

    let JUR = {
      category_group_id: 4,
      cd_category_group_sub: "JUR",
      nm_category_group_sub: "Juros"
    };
    await CategoryGroupSub.create(JUR);

    let JDC = {
      category_group_id: 4,
      cd_category_group_sub: "JDC",
      nm_category_group_sub: "Juros de cartão"
    };
    await CategoryGroupSub.create(JDC);

    let OUE = {
      category_group_id: 4,
      cd_category_group_sub: "OUE",
      nm_category_group_sub: "Outros empréstimos"
    };
    await CategoryGroupSub.create(OUE);

    let APL = {
      category_group_id: 5,
      cd_category_group_sub: "APL",
      nm_category_group_sub: "Aplicação"
    };
    await CategoryGroupSub.create(APL);

    let PAC = {
      category_group_id: 5,
      cd_category_group_sub: "PAC",
      nm_category_group_sub: "Pagamento de cartão"
    };
    await CategoryGroupSub.create(PAC);

    let RES = {
      category_group_id: 5,
      cd_category_group_sub: "RES",
      nm_category_group_sub: "Resgate"
    };
    await CategoryGroupSub.create(RES);

    let TRA = {
      category_group_id: 5,
      cd_category_group_sub: "TRA",
      nm_category_group_sub: "Transferência"
    };
    await CategoryGroupSub.create(TRA);

    let NAC = {
      category_group_id: 6,
      cd_category_group_sub: "NAC",
      nm_category_group_sub: "Não Categorizado"
    };
    await CategoryGroupSub.create(NAC);

    return res.json({});
  }

  async insertDmTransactionType(req, res) {
    let ENT = {
      cd_transaction_type: "ENT",
      nm_transaction_type: "Entrada"
    };
    await TransactionType.create(ENT);

    let SAI = {
      cd_transaction_type: "SAI",
      nm_transaction_type: "Saída"
    };
    await TransactionType.create(SAI);

    return res.json({});
  }
}

export default new AdmController();
