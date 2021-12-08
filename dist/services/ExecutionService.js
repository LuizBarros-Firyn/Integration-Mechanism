"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const models_1 = require("../models");
const UtilityServices_1 = require("./UtilityServices");
const ExecutionService = async () => {
    await models_1.SellsEntry.deleteMany();
    await models_1.Product.deleteMany();
    await models_1.Seller.deleteMany();
    await models_1.DataSourceModule.deleteMany();
    await models_1.DataSourceModuleType.deleteMany();
    await models_1.DataSourceField.deleteMany();
    await models_1.DataSource.deleteMany();
    await Promise.all([
        models_1.DataSource.createMany({
            data: [
                {
                    name: 'A'
                },
                {
                    name: 'B'
                }
            ]
        }),
        models_1.DataSourceModuleType.createMany({
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
    await Promise.all([
        models_1.DataSourceModule.create({
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
        models_1.DataSourceModule.create({
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
        models_1.DataSourceModule.create({
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
        models_1.DataSourceModule.create({
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
    const sourceAProductRequestModule = await models_1.DataSourceModule.findFirst({
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
    const { Fields: sourceAProductRequestFields, dataSourceId: sourceAProductRequestDataSourceId } = sourceAProductRequestModule;
    await Promise.all(sourceAProductRequest.data.map(async (product) => {
        const requestData = {
            dataSourceId: sourceAProductRequestDataSourceId
        };
        sourceAProductRequestFields.forEach(field => {
            requestData[field.systemField] = product[field.externalField];
        });
        await models_1.Product.upsert({
            where: {
                globalKey: product.ean
            },
            create: requestData,
            update: requestData
        });
    }));
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
    const sourceBProductRequestModule = await models_1.DataSourceModule.findFirst({
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
    const { Fields: sourceBProductRequestFields, dataSourceId: sourceBProductRequestDataSourceId } = sourceBProductRequestModule;
    await Promise.all(sourceBProductRequest.data.map(async (product) => {
        const requestData = {
            dataSourceId: sourceBProductRequestDataSourceId
        };
        sourceBProductRequestFields.forEach(field => {
            if (field.externalField === 'timestamp')
                requestData[field.systemField] = (0, date_fns_1.fromUnixTime)(+product[field.externalField]);
            else
                requestData[field.systemField] = product[field.externalField];
        });
        await models_1.Product.upsert({
            where: {
                globalKey: product.gtin
            },
            create: requestData,
            update: requestData
        });
    }));
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
    const sourceASellerRequestModule = await models_1.DataSourceModule.findFirst({
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
    const { Fields: sourceASellerRequestFields, dataSourceId: sourceASellerRequestDataSourceId } = sourceASellerRequestModule;
    await Promise.all(sourceASellerRequest.data.map(async (seller) => {
        const requestData = {
            dataSourceId: sourceASellerRequestDataSourceId
        };
        sourceASellerRequestFields.forEach(field => {
            requestData[field.systemField] = seller[field.externalField];
        });
        const existingSeller = await models_1.Seller.findFirst({
            where: {
                name: seller.nome
            }
        });
        if (existingSeller)
            await models_1.Seller.update({
                where: {
                    id: existingSeller.id
                },
                data: requestData
            });
        else
            await models_1.Seller.create({
                data: requestData
            });
    }));
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
    const sourceBSellerRequestModule = await models_1.DataSourceModule.findFirst({
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
    const { Fields: sourceBSellerRequestFields, dataSourceId: sourceBSellerRequestDataSourceId } = sourceBSellerRequestModule;
    await Promise.all(sourceBSellerRequest.data.map(async (seller) => {
        const requestData = {
            dataSourceId: sourceBSellerRequestDataSourceId
        };
        sourceBSellerRequestFields.forEach(field => {
            requestData[field.systemField] = seller[field.externalField];
        });
        const existingSeller = await models_1.Seller.findFirst({
            where: {
                name: seller.name
            }
        });
        if (existingSeller)
            await models_1.Seller.update({
                where: {
                    id: existingSeller.id
                },
                data: requestData
            });
        else
            await models_1.Seller.create({
                data: requestData
            });
    }));
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
    const seller = await models_1.Seller.findFirst({
        where: {
            chain: data.ponto_de_venda.split(' - ')[0]
        }
    });
    await models_1.SellsEntry.create({
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
                    id: seller.id
                }
            }
        }
    });
    await models_1.User.create({
        data: {
            email: 'usuario@gmail.com',
            name: 'Usuário teste',
            password: (0, UtilityServices_1.Sha3Factory)('password123')
        }
    });
};
exports.default = ExecutionService;
