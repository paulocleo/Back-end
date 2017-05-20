package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import controller.Conexao;
import controller.Constantes;
import model.Voo;

public class ConfiguracaoDAO extends Conexao {

	public Voo listaDadosConfiguracao(){
		Voo dadosConfiguracao;
		List<Voo> listaDadosConfiguracao = new ArrayList<>();
		
		String sql = "SELECT dat_inicio, dat_fim, aeroporto_destino, aeroporto_origem FROM tb_configuracao";
		abrirConexao(sql);
		try {
			ResultSet rs = this.stmt.executeQuery();
			while (rs.next()) {		
				dadosConfiguracao = new Voo();
				dadosConfiguracao.setDat_ida			(rs.getString("dat_inicio"));
				dadosConfiguracao.setDat_volta			(rs.getString("dat_fim"));
				dadosConfiguracao.setDes_cidade_destino	(rs.getString("aeroporto_destino"));
				dadosConfiguracao.setDes_cidade_origem	(rs.getString("aeroporto_origem"));				
								
				listaDadosConfiguracao.add(dadosConfiguracao);
			}
			System.out.println("LISTOU Dados configuracao NA BASE");
			rs.close();
			fecharConexao();
		} catch (SQLException e) {				
			org.primefaces.context.RequestContext.getCurrentInstance().execute("abrirMsgAlerta('"+e.getMessage()+"')");
			e.printStackTrace();
		}
		
		return listaDadosConfiguracao.get(0);
	}
	
	public void atualizaDadosConfiguracao(Voo dados){
				
		String sql = "UPDATE tb_configuracao SET dat_inicio = ?, dat_fim = ?, aeroporto_origem = ?, aeroporto_destino = ?";
		abrirConexao(sql);
		try {	
			stmt.setString(1,	dados.getDat_ida());
			stmt.setString(2, 	dados.getDat_volta());
			stmt.setString(3,	dados.getDes_cidade_origem());
			stmt.setString(4,	dados.getDes_cidade_destino());
			stmt.executeUpdate();
		
			System.out.println(Constantes.DADOS_ATUALIZADOS_SUCESSO);
			org.primefaces.context.RequestContext.getCurrentInstance().execute("abrirMsgSucesso('"+Constantes.DADOS_ATUALIZADOS_SUCESSO+"')");
			org.primefaces.context.RequestContext.getCurrentInstance().execute("ocultarLoad()");
			fecharConexao();
			
		} catch (SQLException e) {				
			org.primefaces.context.RequestContext.getCurrentInstance().execute("abrirMsgAlerta('"+e.getMessage()+"')");
			e.printStackTrace();
		}	
	}	
}
