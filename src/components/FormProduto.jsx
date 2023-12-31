import { useEffect, useState } from "react";
import { FaLocationArrow as Enviar, FaRegTimesCircle  as Cancelar} from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const DivForm = styled.div`
    width: 70%; margin: auto; font-family: Arial, Helvetica, sans-serif;

    h1{text-align:center;}

    form{width: 80%
        ; margin:auto;}

    form input{
        width:100%;
        padding: 8px;
        margin-top: 10px;
        margin-bottom:5px;
        border-radius: 4px;
        }

    a{
        background-color: red; 
        margin-bottom:5px; color:white; 
        text-decoration:none; 
        padding: 8px;
        margin-top: 10px;
        border-radius: 5px;
    }
    button{
        color: white; 
        background-color: green; 
        border: none; 
        display:inline-block;
        padding: 8px; 
        margin-right:50px;
        margin-top: 10px;
        border-radius: 5px;
        cursor: pointer;
    }
`

export default function FormProduto(){

    let {id} = useParams()

    const [novo, setNovo] = useState({
        codigo:id,
        titulo:"",
        preco:"",
        quantidade:""
    })

    let metodo = "post"

    if(id){
        metodo = "put"
    }

    const handleChange = e=>{
        setNovo({...novo, [e.target.name]:e.target.value})
    }

    const handleSubmit = e=>{
        e.preventDefault()
        
        fetch(`http://localhost:8080/produto/${id ? id : ""}`, {
            method: metodo,
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(novo)
        }).then(()=>{
            window.location = "/"
        })
    }

    useEffect(()=>{
        if(id){
            fetch(`http://localhost:8080/produto/${id}`)
            .then((resp)=>{
                return(resp.json())
            }).then(data=>{
                setNovo(data)
            })
        }
    },[id])
    return(
        <DivForm>
            <h1>Form Produto</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="titulo" value={novo.titulo}
                placeholder="Título" onChange={handleChange}/> <br/>
                <input type="number" name="preco" value={novo.preco}
                placeholder="Preço" onChange={handleChange} step="0.01"/> <br/>
                <input type="number" name="quantidade" value={novo.quantidade}
                placeholder="Quantidade" onChange={handleChange}/> <br/>
                <button><Enviar/></button>
                <Link to="/" ><Cancelar/></Link>
            </form>
        </DivForm>
    )
}