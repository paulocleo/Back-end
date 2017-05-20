package view;

import javax.faces.bean.ManagedBean;

import controller.Assert;
import dao.ConfiguracaoDAO;
import model.Voo;

@ManagedBean(name = "telaconfiguracao")
public class TelaConfiguracaoMB {
	
	Voo dadosConfiguracaoVoo = new Voo();
	

	public Voo getDadosConfiguracaoVoo() {
		return dadosConfiguracaoVoo;
	}

	public void setDadosConfiguracaoVoo(Voo dadosConfiguracaoVoo) {
		this.dadosConfiguracaoVoo = dadosConfiguracaoVoo;
	}

	public TelaConfiguracaoMB() {
		
		if(Assert.isNull(dadosConfiguracaoVoo.getDat_ida())){
			ConfiguracaoDAO confDAO = new ConfiguracaoDAO();
			dadosConfiguracaoVoo = confDAO.listaDadosConfiguracao();
		}
				
	}	
	
	public void atualizarDadosConfiguracao(){			
		try{
			ConfiguracaoDAO confiDAO = new ConfiguracaoDAO();
			confiDAO.atualizaDadosConfiguracao(dadosConfiguracaoVoo);
		}
		catch(Exception e){
			e.printStackTrace();
			org.primefaces.context.RequestContext.getCurrentInstance().execute("abrirMsgError('"+e.getMessage()+"')");
		}		
	}

}
