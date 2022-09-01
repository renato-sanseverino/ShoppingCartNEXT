import { prisma } from '../../../config/connection'


export default async function handler(req, res) {
	switch (req.method) {
		case "POST": {
			return saveProduct(req, res);
		}
		case "GET": {
			return getProducts(req, res);
		}
	}
}

const saveProduct = async (req, res) => {
	// const { nome, preco, descricao, foto } = req.body;

	prisma.produto.create({ data: req.body })
	.then((result) => res.send(result))
	.catch((error) => res.send("Error: " + error.message))
}

const getProducts = async (req, res) => {
    prisma.produto.findMany()
    .then((produtos) => res.send(produtos))
    .catch((error) => res.send("Error: " + error.message))
}
