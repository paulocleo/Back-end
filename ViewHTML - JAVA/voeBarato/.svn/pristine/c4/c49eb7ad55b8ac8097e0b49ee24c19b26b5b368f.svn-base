package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import controller.Conexao;
import model.Voo;

public class VooDAO extends Conexao{
	
	public List<Voo> listaVoos(){
		Voo voo;
		List<Voo> listaVoos = new ArrayList<>();
		String sql = "SELECT dataIda, aeroportoDestino, aeroportoOrigem, menorPreco, (SELECT des_aeroporto_completo FROM tb_aeroporto WHERE des_aeroporto_abreviado = TVD.des_empresa) AS des_empresa  FROM tb_voo_dia TVD GROUP BY dataIda";
		abrirConexao(sql);
		try {
			ResultSet rs = this.stmt.executeQuery();
			while (rs.next()) {		
				voo = new Voo();
				voo.setDat_ida				(rs.getString("dataIda"));
				voo.setDes_cidade_destino	(rs.getString("aeroportoDestino"));
				voo.setDes_cidade_origem	(rs.getString("aeroportoOrigem"));
				voo.setVal_preco_com_taxa	(rs.getString("menorPreco"));
				voo.setDes_empresa_aviacao	(rs.getString("des_empresa"));
				
				String[] dataHora = voo.getDat_ida().split("T");
				voo.setDat_ida(dataHora[0]);
				voo.setTime(dataHora[1].substring(0, dataHora[1].length() - 5));
				
				listaVoos.add(voo);
			}
			System.out.println("LISTOU VOOs NA BASE");
			rs.close();
			fecharConexao();
		} catch (SQLException e) {				
			org.primefaces.context.RequestContext.getCurrentInstance().execute("abrirMsgAlerta('"+e.getMessage()+"')");
			e.printStackTrace();
		}
		return listaVoos;
	}

}
