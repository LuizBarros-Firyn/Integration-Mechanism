import { fromUnixTime } from 'date-fns';
import {
  DataSource,
  DataSourceField,
  DataSourceModuleType,
  DataSourceModule,
  Product,
  Seller,
  SellsEntry,
  User
} from '../models';
import { Sha3Factory } from './UtilityServices';

const ExecutionService = async (): Promise<void> => {
  /* eslint-disable */
    // A ideia é que esse serviço represente a evolução do sistema conforme o tempo.
    // Cada bloco (separado por comentários) representa um "Marco" do sistema, visando recriar a situação demonstrada na documentação.
    // Por essa razão, não são aproveitadas variáveis entre um "marco" e outro, pois numa situação real elas não estariam disponíveis!
  /* eslint-enable */

  // Reset (Feito para que a execução possa ser demonstrada toda vez que o programa rodar)

  await SellsEntry.deleteMany();
  await Product.deleteMany();
  await Seller.deleteMany();
  await DataSourceModule.deleteMany();
  await DataSourceModuleType.deleteMany();
  await DataSourceField.deleteMany();
  await DataSource.deleteMany();

  // Criação das fontes de dado (data sources) e tipos de módulos

  await Promise.all([
    DataSource.createMany({
      data: [
        {
          name: 'A'
        },
        {
          name: 'B'
        }
      ]
    }),
    DataSourceModuleType.createMany({
      data: [
        {
          name: 'Product'
        },
        {
          name: 'Seller'
        }
      ]
    })
  ]);

  // Criação dos módulos

  await Promise.all([
    DataSourceModule.create({
      data: {
        DataSource: {
          connect: {
            name: 'A'
          }
        },
        Type: {
          connect: {
            name: 'Product'
          }
        },
        Fields: {
          createMany: {
            data: [
              {
                systemField: 'name',
                externalField: 'name'
              },
              {
                systemField: 'globalKey',
                externalField: 'ean'
              },
              {
                systemField: 'category',
                externalField: 'category'
              },
              {
                systemField: 'brand',
                externalField: 'brand'
              },
              {
                systemField: 'height',
                externalField: 'height'
              },
              {
                systemField: 'width',
                externalField: 'width'
              },
              {
                systemField: 'weight',
                externalField: 'weiht'
              }
            ]
          }
        }
      }
    }),
    DataSourceModule.create({
      data: {
        DataSource: {
          connect: {
            name: 'B'
          }
        },
        Type: {
          connect: {
            name: 'Product'
          }
        },
        Fields: {
          createMany: {
            data: [
              {
                systemField: 'name',
                externalField: 'name'
              },
              {
                systemField: 'globalKey',
                externalField: 'gtin'
              },
              {
                systemField: 'brand',
                externalField: 'brand'
              },
              {
                systemField: 'createdAt',
                externalField: 'timestamp'
              }
            ]
          }
        }
      }
    }),
    DataSourceModule.create({
      data: {
        DataSource: {
          connect: {
            name: 'A'
          }
        },
        Type: {
          connect: {
            name: 'Seller'
          }
        },
        Fields: {
          createMany: {
            data: [
              {
                systemField: 'name',
                externalField: 'nome'
              },
              {
                systemField: 'chain',
                externalField: 'rede'
              },
              {
                systemField: 'banner',
                externalField: 'bandeira'
              },
              {
                systemField: 'cnpj',
                externalField: 'cnpj'
              },
              {
                systemField: 'address',
                externalField: 'endereco'
              }
            ]
          }
        }
      }
    }),
    DataSourceModule.create({
      data: {
        DataSource: {
          connect: {
            name: 'B'
          }
        },
        Type: {
          connect: {
            name: 'Seller'
          }
        },
        Fields: {
          createMany: {
            data: [
              {
                systemField: 'name',
                externalField: 'name'
              },
              {
                systemField: 'chain',
                externalField: 'chain'
              },
              {
                systemField: 'banner',
                externalField: 'banner'
              },
              {
                systemField: 'address',
                externalField: 'address'
              },
              {
                systemField: 'type',
                externalField: 'type'
              }
            ]
          }
        }
      }
    })
  ]);

  // Execução fake da inserção de produtos da fonte A

  const sourceAProductRequest = {
    data: [
      {
        name: 'Bolacha Recheada Vermelha',
        ean: '9990001114445',
        category: 'Biscoito',
        brand: 'Vermelha',
        height: 0,
        width: 0,
        weight: 0
      },
      {
        name: 'Refrigerante Finta Sabor Cola 2L',
        ean: '9990001113332',
        category: 'Refrigerante',
        brand: 'Finta',
        height: 10,
        width: 5,
        weight: 2000
      }
    ]
  };

  const sourceAProductRequestModule = await DataSourceModule.findFirst({
    where: {
      DataSource: {
        name: 'A'
      },
      Type: {
        name: 'Product'
      }
    },
    include: {
      Fields: {
        select: {
          systemField: true,
          externalField: true
        }
      }
    }
  });

  const {
    Fields: sourceAProductRequestFields,
    dataSourceId: sourceAProductRequestDataSourceId
  } = sourceAProductRequestModule!;

  await Promise.all(
    sourceAProductRequest.data.map(async product => {
      const requestData: any = {
        dataSourceId: sourceAProductRequestDataSourceId
      };

      sourceAProductRequestFields.forEach(field => {
        requestData[field.systemField] = product[field.externalField];
      });

      await Product.upsert({
        where: {
          globalKey: product.ean
        },
        create: requestData,
        update: requestData
      });
    })
  );

  // Execução fake da inserção de produtos da fonte B

  const sourceBProductRequest = {
    data: [
      {
        name: 'Biscoito Recheado Vermelho 200gr',
        gtin: '9990001114445',
        brand: 'Vermelha',
        timestamp: '12300044456'
      }
    ]
  };

  const sourceBProductRequestModule = await DataSourceModule.findFirst({
    where: {
      DataSource: {
        name: 'B'
      },
      Type: {
        name: 'Product'
      }
    },
    include: {
      Fields: {
        select: {
          systemField: true,
          externalField: true
        }
      }
    }
  });

  const {
    Fields: sourceBProductRequestFields,
    dataSourceId: sourceBProductRequestDataSourceId
  } = sourceBProductRequestModule!;

  await Promise.all(
    sourceBProductRequest.data.map(async product => {
      const requestData: any = {
        dataSourceId: sourceBProductRequestDataSourceId
      };

      sourceBProductRequestFields.forEach(field => {
        if (field.externalField === 'timestamp')
          requestData[field.systemField] = fromUnixTime(
            +product[field.externalField]
          );
        else requestData[field.systemField] = product[field.externalField];
      });

      await Product.upsert({
        where: {
          globalKey: product.gtin
        },
        create: requestData,
        update: requestData
      });
    })
  );

  // Execução fake da inserção de ponto de vendas da fonte A

  const sourceASellerRequest = {
    data: [
      {
        nome: 'Supermercado Big Barreiros',
        rede: 'Wallmart',
        bandeira: 'Big',
        cnpj: '1234560007789',
        endereco: 'Rua XYZ, Barreiros'
      }
    ]
  };

  const sourceASellerRequestModule = await DataSourceModule.findFirst({
    where: {
      DataSource: {
        name: 'A'
      },
      Type: {
        name: 'Seller'
      }
    },
    include: {
      Fields: {
        select: {
          systemField: true,
          externalField: true
        }
      }
    }
  });

  const {
    Fields: sourceASellerRequestFields,
    dataSourceId: sourceASellerRequestDataSourceId
  } = sourceASellerRequestModule!;

  await Promise.all(
    sourceASellerRequest.data.map(async seller => {
      const requestData: any = {
        dataSourceId: sourceASellerRequestDataSourceId
      };

      sourceASellerRequestFields.forEach(field => {
        requestData[field.systemField] = seller[field.externalField];
      });

      const existingSeller = await Seller.findFirst({
        where: {
          name: seller.nome
        }
      });

      if (existingSeller)
        await Seller.update({
          where: {
            id: existingSeller.id
          },
          data: requestData
        });
      else
        await Seller.create({
          data: requestData
        });
    })
  );

  // Execução fake da inserção de ponto de vendas da fonte B

  const sourceBSellerRequest = {
    data: [
      {
        name: 'Supermercado Big Barreiros',
        chain: 'Wallmart',
        banner: 'Big',
        address: 'XYZ Street, Barreiros',
        type: 'Hiper-Super'
      },
      {
        name: 'Fort Atacadista Campeche',
        chain: 'Fort',
        banner: 'Fort',
        address: 'Campeche Street, Campeche',
        type: 'Atacado'
      }
    ]
  };

  const sourceBSellerRequestModule = await DataSourceModule.findFirst({
    where: {
      DataSource: {
        name: 'B'
      },
      Type: {
        name: 'Seller'
      }
    },
    include: {
      Fields: {
        select: {
          systemField: true,
          externalField: true
        }
      }
    }
  });

  const {
    Fields: sourceBSellerRequestFields,
    dataSourceId: sourceBSellerRequestDataSourceId
  } = sourceBSellerRequestModule!;

  await Promise.all(
    sourceBSellerRequest.data.map(async seller => {
      const requestData: any = {
        dataSourceId: sourceBSellerRequestDataSourceId
      };

      sourceBSellerRequestFields.forEach(field => {
        requestData[field.systemField] = seller[field.externalField];
      });

      const existingSeller = await Seller.findFirst({
        where: {
          name: seller.name
        }
      });

      if (existingSeller)
        await Seller.update({
          where: {
            id: existingSeller.id
          },
          data: requestData
        });
      else
        await Seller.create({
          data: requestData
        });
    })
  );

  // Execução fake da inserção de dados de venda

  const dailySellsRequest = {
    data: {
      dia: new Date('2019-01-10'),
      produto: '9990001114445',
      ponto_de_venda: 'Wallmart - Rua XYZ, Barreiros',
      total_vendido: 10,
      valor_vendido: 55,
      total_estoque: 5
    }
  };

  const { data } = dailySellsRequest;

  // Separado para poder pesquisar por dados não unicos
  const seller = await Seller.findFirst({
    where: {
      chain: data.ponto_de_venda.split(' - ')[0]
    }
  });

  await SellsEntry.create({
    data: {
      day: data.dia,
      quantitySold: data.total_vendido,
      valueSold: data.valor_vendido,
      remainingStock: data.total_estoque,
      Product: {
        connect: {
          globalKey: data.produto
        }
      },
      Seller: {
        connect: {
          id: seller!.id
        }
      }
    }
  });

  // Criação de usuário para acesso aos dados

  await User.create({
    data: {
      email: 'usuario@gmail.com',
      name: 'Usuário teste',
      password: Sha3Factory('password123')
    }
  });
};

export default ExecutionService;
