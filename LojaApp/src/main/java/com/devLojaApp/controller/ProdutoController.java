package com.devLojaApp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.devLojaApp.entity.Produto;
import com.devLojaApp.services.ProdutoServices;

// class controladora de requisições Http "RestController"
@RestController
@RequestMapping("/produto/")
public class ProdutoController {

	// injeção do ProdutoServices
	@Autowired
	private ProdutoServices services;

	// Methodo findAll retorna uma Lista de Produtos
	@GetMapping
	public ResponseEntity<List<Produto>> findAll() {
		List<Produto> objProduto = services.findAll();
		return ResponseEntity.ok().body(objProduto);
	}
	
	// Methodo retorna um objeto produto por id
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Produto>> findById(@PathVariable Integer id){
		Optional<Produto> produtoId = services.findById(id);
		return ResponseEntity.ok().body(produtoId);
	}
	
	// Methodo responsavel por salvar um Produto
	@PostMapping
	public  ResponseEntity<Produto> save(@RequestBody Produto produto){
		Produto newProduto = services.save(produto);
		return ResponseEntity.ok().body(newProduto);
				
	}
	
	// Methodo responsavel por editar um produto por id
	@PutMapping("/{id}")
	public ResponseEntity<Produto> editarProduto(@PathVariable Integer id, @RequestBody Produto produto){
		Produto produtoEditado = services.editProduto(id,produto);
		return ResponseEntity.status(HttpStatus.CREATED).body(produtoEditado);
	}
	
	// Methodo responsavel por deletar um Produto
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id){
		services.delete(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

}
