package view;

import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ManagedBean;

import controller.Assert;
import dao.VooDAO;
import model.Voo;

@ManagedBean(name = "telaprincipal")

public class TelaPrincipalMB {
	Voo dadosVoo = new Voo();
	VooDAO voodao = new VooDAO();
	List<Voo> voos = new ArrayList<>();
	List<Voo> novaListaVoo = new ArrayList<>();
	
	public String obterDadosVoo(){		
		String dados = "";
		String dadosFinal = "";		
		
		if(Assert.isEmptyList(novaListaVoo)){
			voos = voodao.listaVoos();				
			novaListaVoo = ajustarDadosVoo(novaListaVoo);
		}			
		
		String tagInicio = "[";
		String tagFim = "]";
		for (Voo voo : novaListaVoo) {
			dados = "['"+voo.getDes_cidade_origem()+"', "
						+ "'"+voo.getDes_cidade_destino()+"',"
						+ "'"+voo.getDat_ida()+"', "
						+ "'"+voo.getVal_preco_com_taxa()+"', "
						+ "'"+voo.getDes_empresa_aviacao()+"',"
						+ "'"+voo.getTime()+"'"
						+ "],";
			dadosFinal = dadosFinal + dados;
		}
		String dadoSemVirgula = dadosFinal.substring(0, dadosFinal.length() - 1);
		dadoSemVirgula = tagInicio + dadoSemVirgula + tagFim;
		System.out.println(dadoSemVirgula);
		return dadoSemVirgula;
	}	
	
	public List<Voo> ajustarDadosVoo(List<Voo> novaListaVoo){
		
//		for (Voo voo : voos) {
//			if(!Assert.isEmptyList(novaListaVoo)){
//				for (Voo vooNovaLista : novaListaVoo) {
//					String data = "-" + Integer.valueOf(voo.getDat_ida().substring(8));
//					if((voo.getDes_cidade_origem().equals(vooNovaLista.getDes_cidade_origem()) &&
//							voo.getDes_cidade_destino().equals(vooNovaLista.getDes_cidade_destino()) && 
//								voo.getDat_ida().equals(vooNovaLista.getDat_ida()) && 
//									voo.getDes_empresa_aviacao().equals(vooNovaLista.getDes_empresa_aviacao()))){
//						if(Double.valueOf(voo.getVal_preco_com_taxa()) < Double.valueOf(vooNovaLista.getVal_preco_com_taxa())){
//							vooNovaLista.setVal_preco_com_taxa(voo.getVal_preco_com_taxa());
//						}
//					}else{
//						novaListaVoo.add(voo);
//					}
//				}
//			}else{
//				novaListaVoo.add(voo);
//			}
//			
//		}
		//########################3
//		for (int i = 0; i < 31; i++) {
//			Voo vooEncontrado = new Voo();
//			for (Voo voo : voos) {
//				String data = "-" + Integer.valueOf(voo.getDat_ida().substring(8));
//				if(data.equals("-"+i)){						
//					if(!Assert.isNotNullAndEmpty(vooEncontrado.getVal_preco_com_taxa())){
//						vooEncontrado = voo;												
//					}
//					if(Double.valueOf(voo.getVal_preco_com_taxa()) <= 
//							Double.valueOf(vooEncontrado.getVal_preco_com_taxa())){
//						if(!voo.getDes_cidade_origem().equals(vooEncontrado.getDes_cidade_origem()) || 
//								!voo.getDes_cidade_destino().equals(vooEncontrado.getDes_cidade_destino())){
//							vooEncontrado = voo;
//						}
//					}
//				}
//			}
//			if(Assert.isNotNull(vooEncontrado.getVal_preco_com_taxa()))
//				novaListaVoo.add(vooEncontrado);
//		}
		
//		return novaListaVoo;
		return voos;
	}
}
