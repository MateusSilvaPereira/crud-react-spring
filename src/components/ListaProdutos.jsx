import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaEdit, FaTrash } from 'react-icons/fa'


const DivLista = styled.div`
    width: 70%;
    margin: auto;
    font-family:Arial;

    a{
    text-decoration: none;
    padding: 10px 15px;
    margin-bottom: 20px;
    background-color: #389440;
    border-radius: 5px;
    color: white;
    display: inline-block;
    margin-left: 20px;
}

table{
    width: 100%;
    margin: auto;
}

thead th {
    background-color: #397ed8;
    color: white;
    padding: 17px 17px;
}
thead tr th{
    padding: 10px;
} 
tbody tr:nth-child(2n+2){
    background-color: #ccc;
}

tbody tr td a{
    background-color: none;
    margin-bottom: 5px;
    color: #552f2f;
}

tbody tr td {
    text-align: center;
}

tbody tr td button{
    cursor: pointer;
    margin-left: 20px;
    color: #d82626;
    background-color: none;
    border: none;
}

tfoot tr td{
    text-align: center;
    background-color: #333;
    color: white;
}
`

export default function ListaProdutos() {

    // eslint-disable-next-line no-unused-vars
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/produto/").then((resposta) => {
            return resposta.json();
        }).then((resposta) => {
            setProdutos(resposta)
            console.log(resposta);
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/produto/${id}`, {
            method: "delete"
        }).then(() => {
            window.location = "/"
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <DivLista>
            <h1>Lista Produtos</h1>

            <Link to={"/incluir"}>Inserir Produto</Link>

            <table>
                <thead>
                    <th>Título</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th></th>
                </thead>
                <tbody>
                    {
                        produtos.map((produto) => (
                            <tr key={produto.codigo}>
                                <td>{produto.titulo}</td>
                                <td>R$ {produto.preco}</td>
                                <td>{produto.quantidade}</td>
                                <td>
                                    <Link to={`/editar/${produto.codigo}`}><FaEdit /></Link>
                                    <button onClick={handleDelete.bind(this, produto.codigo)}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}

                </tbody>
                <tFoot>
                    <tr>
                        <td colSpan={'4'}>Todos os direitos reservados para @Table-2023</td>
                    </tr>
                </tFoot>
            </table>
        </DivLista>
    );
}