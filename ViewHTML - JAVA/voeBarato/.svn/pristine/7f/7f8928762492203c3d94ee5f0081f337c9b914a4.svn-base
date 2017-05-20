package controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Conexao {
	protected Connection con;
	protected PreparedStatement stmt;
	
	public static Connection getConnection() {
		Connection conn = null;

		try {
			Class.forName(BancoEnum.BANCO_CLASSPAH);
			conn = DriverManager.getConnection(BancoEnum.BANCO_URL,
					BancoEnum.BANCO_USERNAME, BancoEnum.BANCO_SENHA);
		} catch (ClassNotFoundException e) {			
			org.primefaces.context.RequestContext.getCurrentInstance().execute("abrirMsgError('"+e.getMessage()+"')");
			e.printStackTrace();
		} catch (SQLException e) {
			org.primefaces.context.RequestContext.getCurrentInstance().execute("abrirMsgError('Database: "+e.getCause().getMessage()+"')");
			e.printStackTrace();
			if (e.getCause().toString()
					.contains("UnknownHostException"))
				org.primefaces.context.RequestContext.getCurrentInstance().execute("abrirMsgError('"+Constantes.BANCO_DE_DADOS_NAO_ENCONTRADO+"')");
		}

		return conn;
	}
	
	protected void fecharConexao() {
		try {
			this.stmt.close();
			this.con.close();
		} catch (SQLException e) {
			e.printStackTrace();
			org.primefaces.context.RequestContext.getCurrentInstance().execute("abrirMsgAlerta('"+e.getMessage()+"')");
		}
	}
	
	protected void abrirConexao(String sql) {

		try {
			this.con = Conexao.getConnection();
			this.stmt = con.prepareStatement(sql);

		} catch (SQLException e) {
			e.printStackTrace();
			org.primefaces.context.RequestContext.getCurrentInstance().execute("abrirMsgAlerta('"+e.getMessage()+"')");
		}
	}
}
