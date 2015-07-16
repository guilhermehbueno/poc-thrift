package com.camel.websocket.example;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.springframework.beans.factory.InitializingBean;

public class RuleProcessor implements Processor, InitializingBean{

	public void process(Exchange exc) throws Exception {
		System.out.println("Hello! Passei pelo RuleProcessor");
		System.out.println("Recebi: " + exc.getIn().getBody());
		exc.getIn().setBody("Recebi esta mensagem do Nginx, processei no Drools e retornei via websocket");
//		exc.getOut().setBody("Recebi esta mensagem do Nginx, processei no Drools e retornei via websocket");
	}

	public void afterPropertiesSet() throws Exception {
		
	}
}
