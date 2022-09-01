import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { notification } from "../config/notification";


export const ProductForm = ({dialogRef}) => {
	const router = useRouter();

	const [product, setProduct] = useState({
		nome: "",
		preco: "",
		descricao: "",
		foto: "",
	})

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (product.nome === "" || product.preco === "" || product.descricao === "") {
			toast.error('Favor preencher todos os campos!', notification.options);
			return;
		}

		try {
			if (!router.query.id) {
				await axios.post("/api/products", {
					...product,
				});
			} else {
				await axios.put("/api/products/" + router.query.id, {
					...product,
				});
			}
		} catch (error) {
			toast.error(error.message, notification.options);
			return;
		}

		router.push("/");
		toast.success('Produto salvo com sucesso', notification.options);
		dialogRef.toggle();
	};

	const onChange = (e) => {
		setProduct({
			...product,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		const getProduct = async (id) => {
			const { data: product } = await axios.get("/api/products/" + id);
			setProduct(product);
		};

		if (router.query.id) {
			getProduct(router.query.id);
		}
	}, []);

	return (
		<div>
			<Toaster />

			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label htmlFor="nome" className="block text-gray-700 text-sm font-bold md-2">
						Nome
					</label>
					<input type="text"
						name="nome"
						value={product.nome}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="preco" className="block text-gray-700 text-sm font-bold md-2">
						Preço
					</label>
					<input type="text"
						name="preco"
						value={product.preco}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="descricao" className="block text-gray-700 text-sm font-bold md-2">
						Descrição
					</label>
					<input type="text"
						name="descricao"
						value={product.descricao}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="foto" className="block text-gray-700 text-sm font-bold md-2">
						Foto
					</label>
					<div className="bg-gray-400 flex flex-row">
						<textarea
							name="foto"
							value={product.foto}
							className="min-w-fit resize-x border rounded text-gray-700"
							onChange={onChange} >
						</textarea>
						<img className="w-48" src={"data:" + product.formatoImagem + ", " + product.foto} alt={product.nome}></img>
					</div>
				</div>
				<button type="submit" className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white font-bold">
					Salvar
				</button>
			</form>
		</div>
	);
};
