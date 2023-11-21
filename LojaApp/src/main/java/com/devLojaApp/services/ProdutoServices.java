package com.devLojaApp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devLojaApp.entity.Produto;
import com.devLojaApp.repository.ProdutoRepository;

@Service
public class ProdutoServices {
	
	@Autowired
	private ProdutoRepository produtoRepository;

	// Retorna uma lista de Produtos
	public List<Produto> findAll(){
		return produtoRepository.findAll();
	}
	
	//Retorna um objeto por id do tipo produto
	public Optional<Produto> findById(Integer id) {
		Optional<Produto> produtoObj = produtoRepository.findById(id);
		return produtoObj;
	}
	
	// Methodo Salva um produto
	public Produto save(Produto obj) {
		Produto newProduto = produtoRepository.save(obj);
		return newProduto;
	}
	
	
	// Methodo responsavel por editar um Produto
	public Produto editProduto(Integer id, Produto produto) {
		
		findById(id);
		Produto newProduto = new Produto();
		
		newProduto.setCodigo(id);
		
		newProduto.setTitulo(produto.getTitulo());
		newProduto.setPreco(produto.getPreco());
		newProduto.setQuantidade(produto.getQuantidade());
		return produtoRepository.save(newProduto);
	}
	
	// Methodo responsavel por deletar um Produto por id
	public void delete(Integer id) {
		produtoRepository.deleteById(id);
	}
	
	
}
